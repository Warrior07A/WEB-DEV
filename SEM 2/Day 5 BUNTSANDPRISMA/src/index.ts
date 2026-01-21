import express , {type Request , type Response , type NextFunction} from "express"
import {prisma} from "./db"
import { contestSchema, signinschema, signupschema } from "../types/types";
const app = express();
import "dotenv/config";
import jwt, { JsonWebTokenError, type JwtHeader, type JwtPayload } from "jsonwebtoken"
let SECRET = '${process.env.SECRET}';

function ferr(msg : string , code : number  , res : Response){
    return res.status(code).json({
        "success": false,
        "data": null,
        "error": msg
      })
}
interface AuthRequest extends Request{
    id ? :number,
    role? : "creator" | "contestee" | "both"
}

function authm(reqrole : "creator" | "both"){
    return ((req : AuthRequest , res: Response , next : NextFunction)=>{
        let token = req.headers.authorization?.split(" ")[1] ;
        if (!token){
            return ferr("UNAUTHORIZED" , 401 , res);
        }
        const tokendc = jwt.verify(token,SECRET) as JwtPayload;
        if (reqrole != tokendc.role && reqrole != "both" ){
            return ferr("FORBIDDEN" , 403 , res);
        }
        req.id = tokendc.id;
        req.role = tokendc.role;
        next();

    })
}

app.use(express.json());

app.post("/api/auth/signup", async(req : Request,res : Response)=>{
    const signupvalidation = signupschema.safeParse(req.body)
    if (!signupvalidation.success){
        return  ferr("INVALID_REQUEST" ,400, res);
    }
    let inputdata = signupvalidation.data
    let checkemail = await prisma.users.findUnique({
        where :{
            email : inputdata.email
        }
    })
    if (checkemail){
        return ferr("EMAIL_ALREADY_EXISTS",  400 , res);
    }
    let adduser = await prisma.users.create({
        data : {
            name : inputdata.name ,
            email : inputdata.email,
            password : inputdata.password ,
            role : inputdata.role
        }
    })
    if (adduser){
        return res.status(201).json({
            "success": true,
            "data": {
              "id": adduser.id,
              "name": adduser.name,
              "email": adduser.email,
              "role": adduser.role
            },
            "error": null
          })
    }    
})

app.post("/api/auth/login", async(req : Request,res : Response)=>{
    const signindata = signinschema.safeParse(req.body);
    if (!signindata.success){
        return  ferr("INVALID_REQUEST" ,400, res);
    }
    const usercheck = await prisma.users.findUnique({
        where:{
            email : signindata.data.email,
            password : signindata.data.password
        }
    })
    if (!usercheck){
        return ferr("INVALID_CREDENTIALS" ,401  , res);
    }
    let id = usercheck.id;
    let role = usercheck.role
    let token = jwt.sign({id , role} , SECRET);
    return res.status(200).json({
        "success": true,
        "data": {
          "token": token
        },
        "error": null
      })
})

app.post("/api/contests", authm, async(req : AuthRequest ,res : Response)=>{
    const contestvalid = contestSchema.safeParse(req.body);
    let role = req.role;
    let id = req.id;
    if (!contestvalid.success){
        return  ferr("INVALID_REQUEST" ,400, res);
    }

    let contestadd = await prisma.contests.create({
        data:{
            title : contestvalid.data.title,
            description : contestvalid.data.description,
            creator_id : id!, 
            start_time : contestvalid.data.startTime,
            end_time : contestvalid.data.endTime 
        }
    })
    return res.status(201).json({
        "success": true,
        "data": {
          "id": contestadd.id,
          "title": contestadd.title,
          "description": contestadd.description,
          "creatorId": id,
          "startTime": contestadd.start_time,
          "endTime": contestadd.end_time
        },
        "error": null
      })
})

app.get("/api/contests/:contestId" ,authm ,  async(req : AuthRequest , res : Response)=>{
    let id = req.id;
    let role = req.role;
    let contestId = req.params.contestId;
    const usercheck = await prisma.contests.findMany({
        where : {
            creator_id : id
        }
    })
    if (!usercheck){
        return ferr("CONTEST_NOT_FOUND",404, res);
    }
    const contests = await prisma.contest.findMany({
        where: {
          creatorId: creatorId,
        },
        select: {
          id: true,
          title: true,
          description: true,
      
          mcqQuestions: {
            select: {
              id: true,
              quesId: true,
            },
          },
      
          dsaProblems: {
            select: {
              id: true,
              title: true,
              description: true,
            },
          },
        },
      });
          

})


app.listen(3000);