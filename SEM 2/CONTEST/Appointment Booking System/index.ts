import express, {type NextFunction, type Request, type Response} from "express";
import { avaischemea, serviceschema, signinschema, signupschema } from "./types/types";
import {prisma} from "./db"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { number } from "zod";
import { rmSync } from "node:fs";
const SECRET = "akshat";
const app = express();

app.use(express.json());

function ferr(msg : string ,code : number, res : Response){
    return res.status(code).json({
        success : "false",
        error : msg
    })
}


interface authadd extends Request{
    id? : number
    role? : string
}

function authm(reqrole : string){
    return ((req: authadd, res: Response , next : NextFunction)=>{
        try{
            const token = req.headers.authorization?.split(" ")[1] as string
            if (!token){
                return ferr("INVALID TOKEN" , 401, res );
            }
            const tokenverify = jwt.verify(token, SECRET) as JwtPayload
            const id = tokenverify.id;
            const role = tokenverify.role;
            if (reqrole == role || reqrole == "both"){
                req.id = id;
                req.role = role
                next()
            }
            else{
                return ferr("UNAUTHORISED ACCESS" , 401, res );
            }
        }catch(e){
            return ferr("INVALID TOKEN" , 404, res );
        }
    })
}

function timetominutes (time : string): number{
    const [hh , mm] = time.split(":").map(Number);
    if (hh && mm){
        return (hh * 60  + mm);
    }
    return 0;
}

app.post("/auth/register" , async(req : Request , res : Response )=>{
    const signupverfy = signupschema.safeParse(req.body);
    if (!signupverfy.success){
        return ferr("invalid schema" ,400, res);
    }

    const usercheck = await prisma.user.findUnique({
        where :{
            email : signupverfy.data.email
        }
    })
    if (usercheck){
        return ferr("user is already registered" ,400, res);
    }
    const useradd = await prisma.user.create({
        
        data:{
            name : signupverfy.data.name,
            email : signupverfy.data.email,
            passwordHash : signupverfy.data.password,
            role : signupverfy.data.role
        }
    })
    return res.status(200).json({
        msg: "user has been created successsfully",
        id: useradd.id
    })
})

app.post("/auth/login" , async(req : Request , res : Response )=>{
    const signinverify= signinschema.safeParse(req.body);
    if (!signinverify.success){
        return ferr("invalid schema" ,400, res);
    }
    const usercheck = await prisma.user.findFirst({
        where:
        {
            email : signinverify.data.email,
            passwordHash : signinverify.data.password
        }
    })
    if (!usercheck){
        return ferr("user already exists" , 404 ,res);
    }
    const role = usercheck.role;
    const id = usercheck.id;
    const token = jwt.sign({id, role} , SECRET);
    return res.status(201).json({
        msg:"user signed successfullt",
        token : token
    })

})

app.post("/services" ,authm("SERVICE_PROVIDER"),  async(req : authadd , res : Response )=>{
    const serviceverify = serviceschema.safeParse(req.body);
    if (!serviceverify.success){
        return ferr("invalid schemaa" ,400, res);
    }
    const id = req.id ;
    const role = req.role
    if(!id || !role){
        return ferr("UNAUTHORISE OR ROLE MISSING" , 403 , res);
    }
    const serviceadd  = await prisma.service.create({
        data:{  
            name : serviceverify.data.name,
            type : serviceverify.data.type,
            providerId : id,
            durationMinutes : serviceverify.data.durationMinutes
        }
    })
    return res.status(201).json({
        id : serviceadd.id,
        name : serviceadd.name,
        type : serviceadd.type,
        durationMinutes : serviceadd.durationMinutes
    })
})

app.post("/services/:serviceId/availability" , authm("SERVICE_PROVIDER") , async(req : authadd , res : Response )=>{
   const avaiverify = avaischemea.safeParse(req.body);
   const serviceId = req.params.serviceId as string;
   let sid = parseInt(serviceId);
   if (!avaiverify.success ){
       return ferr("invalid INPUT" , 400, res);
    }
    const id = req.id 
    const role = req.role 
    if(!id || !role){
        return ferr("UNAUTHORISE OR ROLE MISSING" , 403 , res);
    }
    let newstart = timetominutes(avaiverify.data.startTime)
    let newend = timetominutes(avaiverify.data.endTime);

    if (newstart >= newend){
        return ferr("INVALID TIME" , 401 ,res );
    }
    let diff = newend - newstart;

    if ((diff == 30 || diff == 60 || diff == 90 || diff == 120 )){
        const servicef = await prisma.service.findFirst({
            where:{
                id : sid
            }
        })
        if (!servicef){
            return ferr("service not found" , 403, res);
        }
        const servicecheck = await prisma.service.findFirst({
            where:{
                id : sid,
                providerId : id
            }
        })
        if (!servicecheck){
            return ferr("Service doesnt belong to the provider", 404, res);
        }
        // const avaiadd = await prisma.availability.create({
        //     data : {
        //         serviceId : sid,
        //         dayOfWeek : avaiverify.data.dayOfWeek,
        //         startTime : avaiverify.data.startTime,
        //         endTime : avaiverify.data.endTime
        //     }
        // })
        let startmin = (newstart);
        let endmin = Number(newend);
        const availcheck1 = await prisma.availability.findFirst({
            where: {
                serviceId : sid,
                dayOfWeek : avaiverify.data.dayOfWeek,
                AND :[
                    {startTime  : {lt : newend}}
                ]
            }
        })
        console.log(availcheck1);
        return res.json({
            masg : "added"
        })
        
    
        const checkavai = await prisma.availability.findFirst({
    
        })
    }else{
        return ferr("invalid time format" , 400, res);
    }
})

app.listen(3000);