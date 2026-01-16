import express , {type Response , type Request, type NextFunction } from  "express";
import {contestSchema, mcqschema, signinschema, signupschema, type dsashow, type mcqshow} from "./types.ts"
import jwt, { type Jwt, type JwtHeader, type JwtPayload } from "jsonwebtoken";
const SECRET : string = "akshat";
import {Client} from "pg";
const app = express();
app.use(express.json());

function ferr(msg : string , code:  number, res : Response): Response{
    return res.status(code).json(
        {
            "success": false,
            "data": null,
            "error": msg
          }
    )
}
interface pay extends Request{
    id ? : number,
    role ? : string
}
function authm(reqrole : string){
    return ((req : pay , res : Response , next : NextFunction )=>{
        try{
            let token = req.headers.authorization as string;
            if (!token){
                return ferr("INVALID_CREDENTIALS" , 401, res);
            }
            const tokenchange = token.split(" ")[1];
            if (!tokenchange){
                return ferr("INVALID_CREDENTIALS" , 404 ,res);
            }
            const tokeninputs = jwt.verify(tokenchange , SECRET) as JwtPayload;
            const role  = tokeninputs.role;
            console.log(role);
            console.log(reqrole);
            if (role != reqrole || reqrole != "both"){
                console.log("hi");
                return ferr("FORBIDDEN" , 403 ,res);
            }
            req.id = tokeninputs.id;
            req.role = tokeninputs.role;
            next();
        }catch(e){
            return ferr("INVALID_CREDENTIALS", 404 , res);
        }
    })
}

const client: Client = new Client({
    connectionString : "postgresql://neondb_owner:npg_e4MNhcY2mKZX@ep-sweet-sunset-ahg4p0j6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" 
})

client.connect();

app.post("/api/auth/signup",async(req : Request , res : Response)=>{
    const {success,data} = signupschema.safeParse(req.body);
    if(!success){
        return ferr("INVALID_REQUEST" , 400,res);
    }
    const usercheck = await client.query(
        `
        SELECT * FROM users WHERE email = '${data.email}'
        `
    )
    if (usercheck.rowCount){
        return ferr("EMAIL_ALREADY_EXISTS" , 400 , res);
    }
    const adduser = await client.query(
        `
        INSERT INTO users (name , email , password , role) 
        VALUES ('${data.name}' , '${data.email}' , '${data.password}' , '${data.role}' )
        RETURNING *
        `
    )
    return res.status(201).json(
        {
            "success": true,
            "data": {
              "id": adduser.rows[0].id,
              "name": adduser.rows[0].name,
              "email": adduser.rows[0].email,
              "role": adduser.rows[0].role
            },
            "error": null
          }
    )    
})

app.post("/api/auth/login",async(req : Request , res : Response)=>{

    const {success,data} = signinschema.safeParse(req.body);
    if(!success){
        return ferr("INVALID_REQUEST" , 400,res);
    }
    const usercheck = await client.query(
        `
        SELECT * FROM users WHERE email = '${data.email}' AND password = '${data.password}'
        `
    )
    if (!usercheck.rowCount){
        ferr("INVALID_CREDENTIALS" , 401, res);
    }
    const id  = usercheck.rows[0].id;
    const role = usercheck.rows[0].role;
    const token = jwt.sign({id,role} , SECRET);
    return res.status(200).json({
        "success": true,
        "data": {
          "token": token
        },
        "error": null
      })
    
})

app.post("/api/contests",authm("creator") , async(req : pay , res : Response)=>{
    const id = req.id;
    const role = req.role;
    const {success, data } = contestSchema.safeParse(req.body);
    if (!success){
        return ferr("INVALID_REQUEST" , 400,res);
    }

    const contestadd = await client.query(
        `
        INSERT INTO contests (title , description , creator_id ,start_time , end_time )
        VALUES ('${data.title}' , '${data.description}' , '${id}' , '${data.startTime}' , '${data.endTime}' )
        RETURNING *
        `
    )
    const userdata = contestadd.rows[0];
    return res.status(201).json({
        "success": true,
        "data": {
          "id": userdata.id,
          "title": userdata.title,
          "description": userdata.description,
          "creatorId": id,
          "startTime": userdata.start_time,
          "endTime": userdata.end_time
        },
        "error": null
      })
})

app.get("/api/contests/:contestId" , authm("both") , async(req : pay , res : Response)=>{
    const contestId = req.params.contestId;
    const id = req.id;
    const role = req.role;
    const contestcheck = await client.query(
        `
        SELECT * FROM contests WHERE id = '${contestId}'
        `
    )
    if (!contestcheck.rowCount){
        return ferr("CONTEST_NOT_FOUND" , 404 ,res);
    }
    let Cdetails = contestcheck.rows[0];
    let dsadetail = await client.query(
        `
        SELECT * FROM dsa_problems WHERE contest_id = '${contestId}'
        `
    )
    if (!dsadetail){
        return ferr("CONTEST_NOT_FOUND" , 404 , res);
    }
    let Darray : object[]= [];
    for(let i=0;i<dsadetail.rows.length; i++){
        let obj : dsashow = {
            id : dsadetail.rows[i].id,
            questionText : dsadetail.rows[i].question_text,
            options : dsadetail.rows[i].options,
            points : dsadetail.rows[i].points
        };
        Darray.push(obj);
    }
    let mcqdata = await client.query(
        `
        SELECT * FROM mcq_questions WHERE contest_id = 
        `
    )
    let mcqlist =  await client.query(

        `
        SELECT * FROM mcq_questions WHERE contest_id = '${contestId}'
        `
        
    )
    let Marray : object[] = [];
    for(let i=0;i<mcqlist.rows.length; i++){
        let obj : mcqshow = {
            id : dsadetail.rows[i].id,
            questionText : dsadetail.rows[i].question_text,
            options : dsadetail.rows[i].options,
            points : dsadetail.rows[i].points
        };
        Marray.push(obj);
    }
    return res.status(201).json({
        "success": true,
        "data": {   
          "id": Cdetails.id,
          "title": Cdetails.title,
          "description": Cdetails.description,
          "startTime": Cdetails.start_time,
          "endTime": Cdetails.end_time,
          "creatorId": id,
          "mcqs":Marray,
          "dsaProblems": Darray
        },
        "error": null
      })
    
})

app.post("/api/contests/:contestId/mcq" , authm("creator") , async(req : pay , res : Response)=>{
    const contestId = req.params.contestId;
    const id = req.id;
    const role = req.role;
    const {success, data } = mcqschema.safeParse(req.body);
    if (!success){
        return ferr("INVALID_REQUEST" , 400,res);
    }
    const contestcheck = await client.query(
        `
        SELECT * FROM contests WHERE id = '${contestId}'
        `
    )
    if (!contestcheck.rowCount){
        return ferr("CONTEST_NOT_FOUND" , 404 ,res);
    }
    const mcqadd = await client.query(
        `
        INSERT INTO mcq_questions (contest_id ,question_text, options , correct_option_index , points) 
        VALUES ('${contestId}' , '${data.questionText}', '${data.options}' , '${data.correctOptionIndex}' , '${data.points}' )
        RETURNING *
        `
    )
    const mcqdata = mcqadd.rows[0];
    return res.status(201).json({
        "success": true,
        "data": {
          "id": mcqdata.id,
          "contestId": mcqdata.contest_id
        },
        "error": null
      })
})



app.listen(3000);