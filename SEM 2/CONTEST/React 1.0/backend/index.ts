import express , {type Request , type Response}from "express";
import { todoadd } from "./types/types";
import { prisma } from "./db";
import cors from "cors";
const app = express();

app.use(express.json());

app.use(cors());

app.post("/add" , async(req : Request , res : Response)=>{
    const todo = todoadd.safeParse(req.body);
    console.log(todo.data);
    if(!todo.success){
        return res.status(401).json({
            msg : "invald inputs"
        })
    }
    const addtodo = await prisma.todo.create({
        data : {
            title : todo.data.title,
            description : todo.data.desc
        }
    })
    return res.status(201).json({
        msg : "user has been created successfully",
        todoid  :addtodo.id,
        title : addtodo.title,
        description : addtodo.description
    })
})



app.get("/todo" , async(req : Request , res : Response)=>{
    const alltodo = await prisma.todo.findMany();
    if (alltodo.length == 0) {
        return res.status(404).json({
            msg : "no todos right now"
        })
    } 
    else {
        return res.status(201).json({
            todo : alltodo
        })
    }

})


app.listen(3001);