import {express} from "express";
import { signinSchema, signupschema, todoSchema } from "../types";
import { todomodel, usermodel } from "./models";
const app = express();
const SECRET = "AKSHAG";

app.use(express.json());

async function authmiddleware (req,res,next){
    const token = req.headers.token;
    try{
        const tokendata = jwt.verify(token,SECRET);
        const _id = tokendata._id;
        const usercheck = await usermodel.findOne({
            "_id" : _id
        })
        if (usercheck){
            req._id = _id;
            next();
            return;
        }
        res.json({
            msg: "Authorization access denied"
        })
    }catch(e){
        res.json({
            "msg" :  "invalid token or missing token"
        })
    }
}

app.post("/signup",async(req,res)=>{
    const {success,data} = signupschema.safeParse(req.body);
    try{
        if (success){
            const usercheck = await usermodel.findOne({
                "email" : data.email
            })
            if(usercheck){
                res.status(404).json({
                    "msg" : "email already exist!"
                })
                return;
            }
            const userentry = await usermodel.create({
                "name"  : data.name,
                "email" : data.email,
                "password" : data.passoword
            })
            if (userentry){
                res.json({
                    "mssg" : "user has been added"
                })
            }
    
        }
    }catch(e){
        res.json({
            "errror" : e.message
        })
    }    
})

app.post("/signin",async(req,res)=>{
    const {success,data} = signinSchema.safeParse(req.body);
    try{
        if (success){
            const usercheck = await usermodel.findOne({
                "email" : data.email,
                "password" : data.password
            })
            if(usercheck){
                const token = jwt.sign({_id : usercheck._id},SECRET)
                res.json({
                    "msg"  : "you have been logged in ",
                    "token" : token
                })
                return;
            }
            res.json({
                "msg" : "user doesnt exist signup !"
            })
        }else{
            res.json({
                "msg" : "inmput validation error incorrct data"
             })
        }
    }catch(e){
        res.json({
            "errror" : e.message
        })
    }
})

app.use(authmiddleware());

app.post("/todo",async(req,res)=>{
    const {success,data} = todomodel.safeParse(req.body)
    if (success){
        const _id = req._id;
        const todo = await  todoSchema.create({
            "title" : data.title,
            "descr" : data.descr,
            "completed" : false,
        })
        res.json({
            "msg" : "todo has been created successfully !"
        })
        return;
    }
    res.json({
        "msg": "input is inccorect"
    })

})

app.delete("/todo",async(req,res)=>{
    const _id = req._id;
    const {todoid} = req.body;
    const todofound =  await todomodel.findOne({_id})
    if (todofound){
        const dele = todomodel.deleteOne({
            _id : todoid
        })
        res.json({
            "msg" : "todo has been deleted "
        })
        return;
    }
    res.json({
        "msg" : "such todo doesnt exist"
    })
    
})

app.get("/todos",async(req,res)=>{
    const _id = req._id;
    const todos = await todomodel.findOne({
        _id : _id
    })
    if (todos){
        res.json({
            "todo" : todos
        })
        return;
    }
    res.json({
        "msg" : "Such todo doesnt exist !"
    })

})