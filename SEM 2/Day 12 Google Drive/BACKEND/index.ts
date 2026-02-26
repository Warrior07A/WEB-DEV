import dotenv from "dotenv"
import express, { type NextFunction, type Request, type Response , type Express } from "express";
import jwt, { type JwtHeader, type JwtPayload } from "jsonwebtoken";
import {  fileEntry, SigninSchema, SignupSchema, upload } from "./types";
import { prisma } from "./prisma/db";
import { getpresignedurl } from "./S3";
import axios from "axios";
// const SECRET = process.env.SECRET;
dotenv.config();
const SECRET = "akshat";
const app = express();
app.use(express.json());


function ferr(msg : string , code : number , res :Response){
    return res.status(code).json({
        msg : msg
    });
}


function authm(){
    return ((req: Request, res : Response , next : NextFunction)=>{
        try{
            let token = req.headers.authorization as string
            if (!token){
                return ferr("vcsdc",323,res);
            }
            token = token.split(" ")[1] as string;
            let tokeninputs = jwt.verify(token , SECRET) as JwtPayload;
            req.userId = tokeninputs.id;
            console.log("hi");
            next();
        }
        catch(e){
            return ferr("UNAUTHORISED" , 401, res );
        }
    })
}



app.post("/signup",async(req: Request , res : Response )=>{
    const signupverify = SignupSchema.safeParse(req.body);
    if(!signupverify.success){
        return ferr("INVALID INPUTS" , 401, res);
    }
    console.log("hi2");
    const usercheck = await prisma.user.findFirst({
        where:{
            username : signupverify.data.username
        }
    })
    if (usercheck){
        return ferr("USER_ALREADY_EXISTS" , 401, res);
    }
    const useradd = await prisma.user.create({
        data:{
            username : signupverify.data.username,
            password : signupverify.data.password
        }
    })
    return res.status(201).json({
        msg : "user created successfully",
        user_id : useradd.id
    })
})

app.post("/signin" , async(req: Request , res : Response)=>{
    const signinverify = SigninSchema.safeParse(req.body);
    if(!signinverify.success){
        return ferr("INVALID INPUTS" , 401, res);
    }
    const usercheck = await prisma.user.findFirst({
        where:{
            username : signinverify.data.username,
            password : signinverify.data.password
        }
    })
    if (!usercheck){
        return ferr("USER_DOESNOT_EXISTS" , 404, res);
    }
    
    const useradd = await prisma.user.create({
        data:{
            username : signinverify.data.username,
            password : signinverify.data.password
        }
    })
    let id = useradd.id
    const token = jwt.sign({id} , SECRET);
    return res.status(201).json({
        msg : "user signined successfully",
        token : token
    })
})


app.post("/my-drive" , authm() ,async(req : Request , res : Response)=>{
    const uploadver = upload.safeParse(req.body);
    if (!uploadver.success){
        return ferr("INALID_INPUTS" , 401 ,res);
    }
    let userId = req.userId;
    if (!userId){
        return ferr("UNAUTHORISED" , 403 ,res);
    }
    let type = uploadver.data.type;
    let parentFolderId = null;
    if(uploadver.data.parentFolderId){
        parentFolderId = uploadver.data.parentFolderId
    }
    if (parentFolderId!= null){
        const folderinfile = await prisma.file.findFirst({
            where : {
                id : parentFolderId
            }
        })
        if(folderinfile){
            return ferr("FOLDER CANNOT BE IN A FILE " ,300, res);
        }
    }
    if (type == "FOLDER"){
        const folderadd = await prisma.folder.create({
            data :{
                title : uploadver.data.title,
                user_id : userId,
                ParentFolderId : parentFolderId
            }
        })
        return res.json({
            msg : "new folder created success",
            data : folderadd
        })
    }
    else{
        let response = await axios.post("http://localhost:3030/getpresignedurl");
        return res.json({
            data :response.data 
        })

    }
})

app.post("/addfile" ,authm(), async(req : Request , res : Response)=>{
    const fileDataV = fileEntry.safeParse(req.body);
    if (!fileDataV.success){
        return ferr("INALID_INPUTS" , 401 ,res);
    }
    let userId = req.userId;
    if (!userId){
        return ferr("UNAUTHORISED" , 403 ,res);
    }
    const addfile = await prisma.file.create({
        data : {
            title :fileDataV.data.title ,
            user_id : userId, 
            ParentFolderId :fileDataV.data.ParentFolderId ,
            url : fileDataV.data.url
        }
    })  
    return res.status(200).json({
        msg : "file created successfully"
    })
})


app.get("/my-drive/folder/:folderId", authm() , async(req : Request , res : Response)=>{
    let folderId = req.params.folderId || null;
    let userId = req.userId;
    if (!userId){
        return ferr("UNAUTHORISED" , 403 ,res);
    }
    (folderId ? Number(folderId) : null)
    const folderData = await prisma.folder.findMany({
        where:{
            ParentFolderId : folderId 
        }
    })
})




app.listen(3000);