import express from "express";
import {mongoose} from "mongoose";
import jwt from "jsonwebtoken";
export const JWT_SECRET = "akshat1234";
mongoose.connect("mongodb+srv://Warrior07A:UWrenGXgSprYx1ir@cluster0.ru0uizx.mongodb.net/quizapp")
import { SignUpSchema,signinSchema,quizSchema, quesSchema } from "./types.js";
import { usermodel,quizmodel } from "./db.js";
import { authmiddleware } from "./authmiddleware.js";
const app = express();
app.use(express.json());

app.post("/api/auth/signup",async(req,res)=>{
    const {success,data} = SignUpSchema.safeParse(req.body);
    if (!success){
        res.status(400).json({
            "success": false,
            "error": "Invalid request schema",
            "details": { "email": "Invalid email format" }
          } )
          return;
    }
    let userfind = await usermodel.findOne({
        email : data.email
    })
    if (userfind){
        res.status(400).json({
            success: false,
            error: "User with this email already exists",
            details: { email: "Already Exists" }
      })
      return;
    }
    let userentry = await usermodel.create({
        "name" : data.name,
        "email"  : data.email,
        "password" : data.password,
        "role" : data.role
    })
    let userdata= await usermodel.findOne({
        email: data.email,
        password : data.password
    })
    res.status(201).json({
        "success": true,
        "data": { "_id": userdata._id,
             "name": userdata.name, 
             "email": userdata.email,
              "role": userdata.role }
      })
})

app.post("/api/auth/login",async(req,res)=>{
    const {success,data} = signinSchema.safeParse(req.body);
    if (!success){
        res.status(400).json({
            "success": false,
            "error": "Invalid request schema",
            "details": { "email": "Invalid email format" }
          } )
    }else{
        let userinfo = await usermodel.findOne({
            email : data.email,
            password: data.password
        })
        if (!userinfo){
            res.status(400).json({
                success: false,
                error: "Invalid request schema",
                details: { email: "Invalid email format" }
          })
        }else{
            const _id = userinfo._id;
            let role = userinfo.role;
            const token = jwt.sign({_id,role},JWT_SECRET);
            res.json({
                "success": true,
                "data": { "token": token }
              })
        }
    }
})

app.get("/api/auth/me",authmiddleware,async(req,res)=>{
    const _id = req._id;
    const role = req.role;
    const userdata = await usermodel.findOne({
        _id : _id
    })
    if (userdata){
        res.status(200).json({
            "success": true,
            "data": { "_id": userdata._id,
                 "name": userdata.name,
                  "email": userdata.email, 
                  "role": userdata.role }
          })
    }else{
        res.status(401).json({
      success: false,
      error: "Invalid request schema",
      details: { email: "Invalid email format" }
})        
    }
})

app.post("/api/quiz",authmiddleware,async(req,res)=>{
    const _id = req._id;
    const role = req.role;
    console.log(role);
    const {success,data} = quizSchema.safeParse(req.body);
    if (!success){
        res.status(400).json({
            "success": false,
            "error": "Invalid request schema"
          } )
    }else{
        if (role =="admin"){
            const quizcreate = await quizmodel.create({
                "title" : data.title,
                "questions" : data.questions
            })
            const quizdata = await quizmodel.findOne({
                "title" : data.title
            })
            res.status(201).json({                
                "success": true,
                "data": { "_id": quizdata._id,
                        "title": quizdata.title }
            })
        }else{
            res.status(401).json({
                "success": false,
                "error": "Unauthorized, admin access required"
              })
        }
    }

})

app.post("/api/quiz/:quizId/questions",authmiddleware,async(req,res)=>{
    const quizId = req.params.quizId;
    const _id = req._id;
    const role = req.role;
    const {success,data} = quesSchema.safeParse(req.body);
    if (!success){
        res.status(400).json({
            "success": false,
            "error": "Invalid request schema",
            "details": { "email": "Invalid email format" }
          } )
    }else{
        if (role =="admin"){
            const quizfind = await quizmodel.findOne({
                _id : quizId
            })
            let obj = {
                "text": data.text,
                "options": data.options,
                "correctOptionIndex": data.correctOptionIndex
            }
            quizfind.questions.push(obj);
            quizfind.save()
            const refetch = await quizmodel.findOne({
                _id : quizId
            })
            const thisques = refetch.questions.find((ques)=>{
                if (ques.text == data.text) return true;
            })
            res.status(201).json(
                {
                    "success": true,
                    "data": {
                      "quizId": quizId,
                      "question": {
                        "_id": thisques._id,
                        "text": thisques.text,
                        "options": thisques.options,
                        "correctOptionIndex": thisques.correctOptionIndex
                      }
                    }
                  }
            )
        }else{
            res.status(401).json({
                "success": false,
                "error": "Unauthorized, admin access required"
              })
        }
    }
    
})

app.get("/api/quiz/:quizId",authmiddleware,async(req,res)=>{
    const quizId = req.params.quizId;
    const _id = req._id;
    const role = req.role;
    const {success,data} = quesSchema.safeParse(req.body);
    if (!success){
        res.status(400).json({
            "success": false,
            "error": "Invalid request schema",
            "details": { "email": "Invalid email format" }
          } )
    }else{
        if (role =="admin"){
            const quizfind = await quizmodel.findOne({
                _id : quizId
            })
           if (quizfind){
            res.status(200).json(quizfind);
           }else{
            res.status(404).json(
                {
                    "success": false,
                    "error": "Quiz not found"
                  }
            )
           }
        }else{
            res.status(401).json({
                "success": false,
                "error": "Unauthorized, admin access required"
              })
        }
    }

})


app.listen(3000);