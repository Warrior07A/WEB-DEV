import express , {type Response ,type Request, type NextFunction} from "express";
import { courseschema, lectureschema, signinschema, signupschema } from "./types/types";
import { prisma } from "./db";
import { date } from "zod";
import jwt, { type JwtPayload } from "jsonwebtoken"
const SECRET = "akshat";

const app = express();
app.use(express.json());


function ferr(msg : string , code : number , res: Response){
        return res.status(code).json({
            "status" : "Failed",
            errr : msg
        })
}


interface Auth extends Request{
    id? : number
    role? : String
}

function authm(reqrole : string){
    return ((req: Auth , res:Response , next : NextFunction)=>{
        const token = req.headers.authorization?.split(" ")[1] as string;
        if (!token){
            return ferr("TOKEN NOT FOUND" , 404, res);
        }
        const tokeninputs = jwt.verify(token, SECRET) as JwtPayload;
        req.id = tokeninputs.id;
        req.role = tokeninputs.role
        if (req.role == reqrole || reqrole == "both"){
            next();
        }
        else{
            return ferr("invalid creds" , 401 , res);
        }
    })
}

app.post("/auth/signup", async(req : Request , res :Response)=>{
    const signupverify = signupschema.safeParse(req.body);
    if (!signupverify.success){
        return ferr("invalid input" , 400 , res);
    }
    const usercheck = await prisma.user.findUnique({
        where:{
            email : signupverify.data.email
        }
    })
    if (usercheck){
        return ferr("email already exists" , 409,res);
    }

    const adddata = await prisma.user.create({
        data : {
            name : signupverify.data.name,
            email : signupverify.data.email,
            password: signupverify.data.password,
            role : signupverify.data.role
        }
    })
    return res.status(201).json({
        "message":"User created successfully"
    })
})

app.post("/auth/signin", async(req : Request , res :Response)=>{
    const signinverify = signinschema.safeParse(req.body);
    if (!signinverify.success){
        return ferr("invalid input" , 400 , res);
    }
    const usercheck = await prisma.user.findUnique({
        where:{
            email : signinverify.data.email,
            password : signinverify.data.password
        }
    })
    if (!usercheck){
        return ferr("invalid credentials" , 401 , res);
    }

    const id = usercheck.id;
    const role = usercheck.role;
    const token = jwt.sign({id , role} , SECRET);

    return res.status(200).json({
        "token":token
    })
})

app.post("/courses", authm("admin") ,async(req : Auth , res :Response)=>{
    const courseverify = courseschema.safeParse(req.body);
    const role = req.role as string;
    const id = req.id as number;
    if (!courseverify.success  || !id  || !role ){
        return ferr("invalid input" , 400 , res);
    }
    const courseadd = await prisma.course.create({
        data:{
            title : courseverify.data.title,
            description : courseverify.data.description ,
            amount :courseverify.data.amount,
            adminId : id,
        }
    })
    return res.status(201).json({
        id: courseadd.id,
        title : courseadd.title
    })
})


app.get("/courses", authm("both") ,async(req : Auth , res :Response)=>{
    const role = req.role as string;
    const id = req.id as number;
    if (!id  || !role ){
        return ferr("invalid input" , 400 , res);
    }
    const coursearr = await prisma.course.findMany();
    if (coursearr.length == 0){
        return ferr("NO COURSES EXIST" , 404,res );
    }
    return res.status(200).json({
        courses : coursearr
    })
})

app.post("/courses/:courseId/lectures" , authm("admin"), async(req: Auth , res: Response)=>{
    const courseId = Number(req.params.courseId as String) as number;
    const role = req.role as string;
    const id = req.id as number;
    if (!id  || !role ){
        return ferr("invalid input" , 400 , res);
    }
    const lecver = lectureschema.safeParse(req.body);
    if (!lecver.success){
        return ferr("invalid inputs", 401, res);
    }
    const coursecheck = await prisma.course.findUnique({
        where : {
            id  : courseId
        }
    })
    
    const usercheck = await prisma.course.findUnique({
        where :{
            id : courseId,
            adminId : id
        }
    })
    if (!usercheck){
        return ferr("NOT COURSE ADMIN" , 403  ,res) ;
    }


})




app.listen(3000,()=>{
    console.log("app is running on port 3000")
})