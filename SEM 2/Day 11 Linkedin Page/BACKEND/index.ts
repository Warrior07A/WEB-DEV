import express, { type NextFunction, type Request, type Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { PostSchema, SigninSchema, SignupSchema } from "./types/types";
import { prisma } from "./prisma/db";
import cors from "cors";
import type { number } from "zod";
import type { User } from "./generated/prisma/client";
const SECRET = "akshat";

const app = express();

app.use(cors());
app.use(express.json());


function ferr(msg : string, code : number , res: Response){
    return res.status(code).json({
        success : "false", 
        error : msg
    })
}

interface authadd extends Request{
    id? : number,
    role? : string
}

interface Ipost{
    id : number, 
    user_id : number,
    CreatedAt: string,
    content: string,
    contentimg? : string,
    contentvdo? : string,
}
interface Userdata {
    id : number,
    name : string      
    email : string,
    password: string,      
    secretrole? : string,      
    subheading? : string,
    phone? : number,
    coverpic?: string,
    ppic?: string,
    Location?: string,
    About?: string,
    Posts: Ipost[],
}

function authm (reqrole : string)  {
    return ((req : authadd, res : Response , next : NextFunction)=>{
        try{
            const token = req.headers.authorization?.split(" ")[1] as string;
            let tokenver = jwt.verify(token , SECRET) as JwtPayload;
            if (!tokenver) return ferr("UNAUTHORISED" , 401, res);
            let id = tokenver.id;
            let role = tokenver.role;
            req.id = id;
            req.role = role;
            if (!id || !role ){
                return ferr("NOT_FOUND" , 404 , res);
            }
            if (reqrole != role && reqrole != "all" ) {
                console.log("auth mein fata");
                return ferr( "UNAUTHORSED" , 403 , res);
            }
            next();
        }catch(e){
            return ferr("UNAUTHORISED" , 401, res);
        }
    })
}

app.post("/signup", async(req : Request , res : Response)=>{
    const signupvalid = SignupSchema.safeParse(req.body);
    if (!signupvalid.success){
        return ferr("INVALID_INPUT" , 400, res);
    }
    const userexist = await prisma.user.findUnique({
        where : {
            email  : signupvalid.data.email
        }
    })
    if (userexist){
        return ferr("EMAIL_ALREADY_EXISTS" ,409 ,   res);
    }
    if(!signupvalid.data.subheading){
        signupvalid.data.subheading = "Full-Stack Web Developer | App Developer | MERN Stack | "
    }
    if(!signupvalid.data.ppic){
        signupvalid.data.ppic = "https://avatars.githubusercontent.com/u/154778752?v=4"
    }
    const useradd = await prisma.user.create({
        data : {
            name : signupvalid.data.name,
            email : signupvalid.data.email,
            password : signupvalid.data.password,
            subheading : signupvalid.data.subheading, 
            ppic : signupvalid.data.ppic
        }
    })
    return res.status(201).json({
        msg : "user create successfully",
    })
})

app.post("/login" , async(req : Request , res: Response )=>{
    const loginverify = SigninSchema.safeParse(req.body);
    if (!loginverify.success){
        return ferr("INVALID_INPUT" , 400, res);
    }
    const userexist = await prisma.user.findUnique({
        where : {
            email  : loginverify.data.email
        }
    })
    if (!userexist){
        return ferr("USER_DOESNOT_EXIST" , 404 ,  res);
    }
    let id = userexist.id;
    let role = userexist.secretrole;
    const token = jwt.sign({role, id} ,SECRET);
    return res.status(201).json({
        msg : "user create successfully",
        token  :    token
    })
})

app.post("/posts" , 
    authm("all") , 
    async(req : authadd , res: Response )=>{
    const postver = PostSchema.safeParse(req.body);
    if (!postver.success){
        return ferr("INVALID_INPUT" , 400, res);
    }
    let id = req.id;
    let role = req.role;
    if (!id || !role){
        console.log("here1");
        return ferr("UNAUTHORISED" ,403, res);
    }
    let cvid = "";
    console.log(postver.data);
    if (!postver.data.contentimg){
        postver.data.contentimg = "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg";
    }
    let date =  Date.now().toString();
    let postadd = await prisma.posts.create({
        data : {
            user_id  : id,
            CreatedAt : "hi there",
            content  : postver.data.content,
            contentimg : postver.data.contentimg,
            contentvdo : postver.data.contentvdo
            
        }
    })
    return res.status(201).json({   
        data : postadd
    })
    

})

app.get("/posts" ,
    //  authm("all") ,
      async(req : authadd , res: Response )=>{
    // let id = req.id;
    // let role = req.role;
    // if (!id || !role){
    //     console.log("here1");
    //     return ferr("UNAUTHORISED" ,403, res);
    // }
    const getpost = await prisma.posts.findMany({
        include : {
            owner : true
        }
    });
    if (getpost.length == 0){
        return ferr("NO POSTS FOUND" , 404,res);
    }
    // console.log(getpost)
    return res.status(201).json({
        posts : getpost
    })

})
app.listen(3001);