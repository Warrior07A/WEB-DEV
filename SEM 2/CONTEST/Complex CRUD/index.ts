// import express, { type NextFunction, type Request, type Response } from "express";
// import jwt, { type JwtHeader, type JwtPayload } from "jsonwebtoken";
// import { FolderAdd, SigninSchema, SignupSchema } from "./types";
// import { prisma } from "./prisma/db";
import dotenv from "dotenv"
dotenv.config();
// const app = express();
// app.use(express.json());


// function ferr(msg : string , code : number , res :Response){
//     return res.status(code).json();
// }

// interface authadd extends Request{
//     id? : number
// }

// function authm(){
//     return ((req: authadd, res : Response , next : NextFunction)=>{
//         try{
//             let token = req.headers.authorization as string
//             if (!token){
//                 return ferr("vcsdc",323,res);
//             }
//             token = token.split(" ")[1] as string;
//             let tokeninputs = jwt.verify(token , SECRET) as JwtPayload;
//             req.id = tokeninputs.id;
//             next();
//         }
//         catch(e){
//             return ferr("UNAUTHORISED" , 401, res );
//         }
//     })
// }

// app.post("/signup",async(req: Request , res : Response )=>{
//     const signupverify = SignupSchema.safeParse(req.body);
//     if(!signupverify.success){
//         return ferr("INVALID INPUTS" , 401, res);
//     }
//     const usercheck = await prisma.users.findFirst({
//         where:{
//             username : signupverify.data.username
//         }
//     })
//     if (usercheck){
//         return ferr("USER_ALREADY_EXISTS" , 401, res);
//     }
//     const useradd = await prisma.users.create({
//         data:{
//             username : signupverify.data.username,
//             password : signupverify.data.password
//         }
//     })
//     return res.status(201).json({
//         msg : "user created successfully",
//         user_id : useradd.id
//     })
// })

// app.post("/signin" , async(req: Request , res : Response)=>{
//     const signinverify = SigninSchema.safeParse(req.body);
//     if(!signinverify.success){
//         return ferr("INVALID INPUTS" , 401, res);
//     }
//     const usercheck = await prisma.users.findFirst({
//         where:{
//             username : signinverify.data.username,
//             password : signinverify.data.password
//         }
//     })
//     if (!usercheck){
//         return ferr("USER_DOESNOT_EXISTS" , 404, res);
//     }
    
//     const useradd = await prisma.users.create({
//         data:{
//             username : signinverify.data.username,
//             password : signinverify.data.password
//         }
//     })
//     let id = useradd.id
//     const token = jwt.sign({id} , SECRET);
//     return res.status(201).json({
//         msg : "user signined successfully",
//         token : token
//     })
// })


// app.get("/mydrive" ,authm() , async(req : authadd ,  res : Response)=>{

//     let id = req.id;
//     let folderdetails = await prisma.folder.findMany({
//             where : {
//                 userId : id,
//                 parentFolderid : null
//             }
//     })  
//     let filedetails = await prisma.file.findMany({
//         where : {
//             userId : id,
//             parentFolderId : null
//         }
//     })


// })


// app.post("/addfolder/:folderId" ,authm(),  async(req : authadd ,  res : Response)=>{
//     let folderaddverify = FolderAdd.safeParse(req.body);
//     if (!folderaddverify.success){
//         return ferr("INVALID_SCHEMA" , 403,res);
//     }
//     let id = req.id ;
//     let folderId = req.params.folderId || null ;
//     const fileverify = FolderAdd.safeParse(req.body);
//     if (!fileverify.success){
//         return ferr("INVALUD INPUTS" , 403, res);
//     }   

//     let addfolder = await prisma.folder.create({
//         data:{
//             userId : id,
//             title : folderaddverify.data?.title , 
//             parentFolderid : folderId? ,
//             createdAt : new Date()
//         }
//     })

// })



// app.get("/folders/:folderId" , authm(),  async(req : authadd ,  res : Response)=>{
//     let folderId = req.params.folderId;

//     let folderdetails = await prisma.folder.findMany({
//         where : {   
//             userId : id,
//             parentFolderid : null
//         }
//     })  
//     let filedetails = await prisma.file.findMany({
//         where : {
//             userId : id,
//             parentFolderId : null
//         }
//     })
// })


import express from "express";
import multer from "multer";

const app = express();

const upload = multer({dest : 'uploads/'});

app.post("/upload",  upload.single("avatar") , (req,res)=>{
    if (!req.file){
        return res.status(403).json({
            msg : "file not found"
        })
    }
    console.log("File Received" ,  {
        originalName : req.file.originalname,
        mimetype : req.file.mimetype,
        size : req.file.size
    })
    res.json({
        originalName : req.file.originalname,
        mimetype : req.file.mimetype,
        size : req.file.size
    })
})

app.listen(3000);