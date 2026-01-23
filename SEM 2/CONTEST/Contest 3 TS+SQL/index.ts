import express,{type Response , type Request, type NextFunction} from "express"
import {prisma} from "./db"
import { coursechema, lessonschema, lessonupdate, purchaseschema, signinschema, signupschema } from "./types/types";
import { password } from "bun";
const SECRET = "akshat";
const app = express();
app.use(express.json());
import jwt, { type JwtPayload } from "jsonwebtoken";
import { check } from "zod";

function ferr(msg : string , code : number , res: Response){
    return res.status(code).json({
        "error":msg,
        "statusCode":code,
        "timestamp": new Date()
        })
        
}

interface Authadd extends Request{
    id? : string,
    role? : string
}

function authm(reqrole : string){
    return ((req:Authadd , res :Response , next : NextFunction)=>{
        try{
            const token = req.headers.authorization?.split(" ")[1] as string
            if (!token){
                return ferr("UNAUTHORIZED", 401, res);
            }
            let tokeninp = jwt.verify(token , SECRET) as JwtPayload
            req.id = tokeninp.id;
            req.role = tokeninp.role;
            if (reqrole != req.role && reqrole != "both"){
                return ferr("FORBIDDEN", 403, res);
            }
            next();
        }catch(e){
            return ferr("UNAUTHORIZED", 401, res);
        }
    })  
}

app.post("/auth/signup", async(req : Request , res : Response )=>{
    const signupdata = signupschema.safeParse(req.body);
    if (!signupdata.success){
        return ferr("INVALID inputs" , 400, res);
    }
    const usercheck = await prisma.user.findUnique({
        where:{
            email : signupdata.data.email
        }
    })
    if (usercheck){
        return ferr("EMAIL_ALREADY_EXISTS" , 400,res);
    }
    let useradd = await prisma.user.create({
        data:{
            email : signupdata.data.email,
            password : signupdata.data.password,
            name : signupdata.data.name,
            role : signupdata.data.role
        }
    })
    return res.status(201).json(
        {
            "success": true,
            "data": {
              "id": useradd.id,
              "name": useradd.name,
              "email": useradd.email,
              "role": useradd.role
            },
            "error": null
          }
    )
    
})

app.post("/auth/login", async(req : Request , res : Response )=>{
    let logindata = signinschema.safeParse(req.body);
    if (!logindata.success){
        return ferr("INVALID_REQUEST", 400 ,res);
    }
    let usercheck = await prisma.user.findFirst({
        where:{
            email : logindata.data.email,
            password : logindata.data.password
        }
    })
    if (!usercheck){
        return ferr("INVALID_CREDENTIALS" , 401, res);
    }
    const id = usercheck.id;
    const role = usercheck.role
    const token = jwt.sign({id,role} , SECRET);
    return res.status(201).json({
        "success": true,
        "data": {
          "token": token,
          "user": {
            "id": usercheck.id,
            "name": usercheck.name,
            "email": usercheck.email,
            "role": usercheck.role
          }
        },
        "error": null
      })
})


app.post("/courses", authm("INSTRUCTOR") , async(req : Authadd , res : Response )=>{
    let coursedata = coursechema.safeParse(req.body);
    if (!coursedata.success){
        return ferr("INVALID_REQUEST", 400 ,res);
    }
    let id = req.id;
    let role = req.role
    if (!id ||  !role){
        return ferr("UNAUTHORIZED" , 401, res);
    }
    const courseadd = await prisma.course.create({
        data:{
            title : coursedata.data.title,
            description : coursedata.data.description,
            price : coursedata.data.price,
            instructorId : id 
        }
    })
    return res.status(201).json({
        "success": true,
        "data": {
          "id" : courseadd.id,
          "title" : courseadd.title,
          "description" : courseadd.description,
          "price" : courseadd.price 
        },
        "error": null
      })
})

app.get("/courses", authm("both") , async(req : Authadd , res : Response )=>{
    let id = req.id;
    let role = req.role
    if (!id ||  !role){
        return ferr("UNAUTHORIZED" , 401, res);
    }
    let allcourses = await prisma.course.findMany();
    if (allcourses.length == 0){
        return ferr("NO_COURSES_EXIST" , 400 ,res);
    }
    return res.status(200).json(
        {
            "success": true,
            "data": allcourses,
            "error": null
          }
    )
})

app.get("/courses/:id", authm("both") , async(req : Authadd , res : Response )=>{
    const courseId = req.params.id as string;
    let id = req.id;
    let role = req.role
    if (!id ||  !role ||  !courseId){
        return ferr("UNAUTHORIZED" , 401, res);
    }
    if (!courseId){
        return ferr("COURSEID_MISSING" ,404 ,res );
    }
    const courses = await prisma.course.findUnique({
        where:{
            id : courseId
        },
        include:{
            lessons : true
        }
    });
    if (!courses){
        return ferr("INCORRECT_COURSE_ID" , 404 ,res);
    }
    return res.status(200).json(
        {
            "success": true,
            "data": courses,
            "error": null
          }
    )
})


app.patch("/courses/:id", authm("INSTRUCTOR") , async(req : Authadd , res : Response )=>{
    let patchlesson = lessonupdate.safeParse(req.body);
    let courseId = req.params.id as string
    if (!patchlesson.success){
        return ferr("INVALID_REQUEST", 400 ,res);
    }
    let id = req.id;
    let role = req.role
    if (!id ||  !role ){
        return ferr("UNAUTHORIZED" , 401, res);
    }
    if (!courseId){
        return ferr("COURSEID_MISSING" ,404 ,res );
    }
    const coursecheck = await prisma.course.findFirst({
        where:{
            id : courseId
        }
    })
    if (!coursecheck){
        return ferr("not a valid course id" , 404 , res);
    }
    const instructorcheck = await prisma.course.findFirst({
        where:{
            instructorId : id
        }
    })
    if (!instructorcheck){
        return ferr("NO_COURSES_EXIST" , 404, res);
    }
    let title = patchlesson.data.title ?? instructorcheck.title
    let desc =  patchlesson.data.description ?? instructorcheck.description
    let price =  patchlesson.data.price ?? instructorcheck.price
    let obj = {
        title : title,
        description : desc,
        price : price
    }
    let updatecourses = await prisma.course.update({
        where:{
            id : instructorcheck.id
        },
        data: obj
    })
    return res.status(200).json(
        {
            "success": true,
            "data": {
                "id" : updatecourses.id,
                "title" : updatecourses.title,
                "description" : updatecourses.description,
                "price" : updatecourses.price
            },
            "error": null
          }
    )
})

app.delete("/courses/:id" ,authm("both") ,async(req:Authadd , res: Response)=>{
    let courseId = req.params.id as string;
    let id = req.id ;
    let role = req.role; 
    if (!id ||  !role ){
        return ferr("UNAUTHORIZED" , 401, res);
    }
    if (!courseId){
        return ferr("COURSEID_MISSING" ,404 ,res );
    }
    const checkuser = await prisma.course.findFirst({
        where:{
            instructorId : id
        }
    })
    if (!checkuser){
        return ferr("NO COURSES FOUND" , 404 ,res);
    }
    const deleteuser = await prisma.course.delete({
        where : {
            id : courseId
        }
    })
    return res.status(201).json({
        success : "true",
        msg : "USER HAS BEEN DELETED SUCCESSFULLY"
    })
})

app.post("/lessons" , authm("INSTRUCTOR"),async(req:Authadd , res: Response)=>{
    const lessondata = lessonschema.safeParse(req.body);
    if (!lessondata.success){
        return ferr("INVALID inputs" , 400, res);
    }
    let usercheck = await prisma.user.findFirst({
        where:{
            id : req.id
        }
    })
    if (!usercheck){
        return ferr("NO LESSONS EXIST" , 404 , res);
    }
    const lessonadd = await prisma.lesson.create({
        data:{
            title : lessondata.data.title,
            content : lessondata.data.content,
            courseId : lessondata.data.courseId,
        }
    })
    return res.status(201).json(
        {
            "success": true,
            "data": {
                "title" : lessonadd.title,
                "content" : lessonadd.content,
                "courseId" : lessonadd.courseId
            },
            "error": null
          }
    )
})



app.get("/courses/:courseId/lessons" , authm("both"),async(req:Authadd , res: Response)=>{
    let courseId = req.params.courseId as string
    let id = req.id ;
    let role = req.role; 
    if (!id ||  !role ){
        return ferr("UNAUTHORIZED" , 401, res);
    }
    if (!courseId){
        return ferr("COURSEID_MISSING" ,404 ,res );
    }
    const coursevalid = await prisma.course.findFirst({
        where:{
            id : courseId
        }
    })  
    if (!coursevalid) {
        return ferr("INVALID_COURSE_ID" , 404, res);
    }
    let coursearr = await prisma.course.findMany({
        where:{
            id : courseId
        },
        include:{
            lessons : true
        }
    })
    if (coursearr.length == 0){
        return ferr("NO_LESSONS_EXIST" , 404 ,res);
    }
    return res.status(201).json({
        success : true,
        data : coursearr
    })
})

app.post("/purchases" , authm("both"), async(req : Authadd ,res :Response )=>{
    let id =  req.id;
    let role = req.role;
    if (!id ||  !role ){
        return ferr("UNAUTHORIZED" , 401, res);
    }
    const purchasevalid = purchaseschema.safeParse(req.body);
    if (!purchasevalid.success){
        return ferr("INVALID INPUTS" , 400 , res);
    }
    
})



app.listen(3000);