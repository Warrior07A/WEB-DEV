import { Router, type NextFunction, type Request, type Response } from "express";
import { blog, createblog, viewblog } from "../controller/blogController";
import jwt, { type JwtHeader, type JwtPayload } from "jsonwebtoken";
const SECRET  ="password123";


const router = Router();

export function ferr(msg : string , code : number ,  res :Response){
    return res.status(code).json({
        msg : msg ,
        successs : "false"
    })
}

function authadd (){
    console.log("authadd reached");
    return ((req : Request , res : Response , next  :NextFunction)=>{
        try{
            const token = req.headers.authorization?.split(" ")[1] as string
            console.log(token);
            if (!token ){
                return ferr("TOKEN DOESNOT EXIST" , 400 , res );
            }
            let tokeninputs = jwt.verify(token , SECRET) as JwtPayload;
            console.log(tokeninputs);
            const id = tokeninputs.id;
            req.id = id;
            console.log("i am at token");
            next();
        }
        catch(e){
            console.log(e);
            return ferr("UNAUTHORISED" , 401, res);
            
        }
    })
}

router.use(authadd());

router.get("/all" , viewblog);
router.get("/blog",   blog);
router.post("/create",  createblog);


export default router;