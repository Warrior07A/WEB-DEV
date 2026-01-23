import express , {type Request , type Response} from "express";
import { CreateUserSchema, SigninSchema } from "./types/types";
import { date } from "zod";
import {prisma} from "./prisma"
const app = express();

app.use(express.json());


function ferr(msg : string , code :number , res: Response){
    return res.status(code).json({
        "error": msg,
        "statusCode": code,
        "timestamp": Date()
      }
      )
}

app.post("/users", async(req : Request , res : Response)=>{
    const signupcheck = SigninSchema.safeParse(req.body);
    if (!signupcheck.success){
        return ferr("INVALID_INPUT", 400 ,res );
    }
    const adduser = await prisma.user.create({
        data:{
            email : signupcheck.data.email,
            name : signupcheck.data.name,
            password : signupcheck.data.password
        }
    })
    return res.status(200).json({
        status: "success",
        msg :"user has been created",
        creationId : adduser.id 
    })
    
})