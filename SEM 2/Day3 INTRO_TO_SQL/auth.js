import jwt from "jsonwebtoken";
import {SECRET} from "./index.js"

export function auth(req,res,next){
    const token = req.headers.token;
    try{
        const tokeninputs = jwt.verify(token,SECRET);
        if (tokeninputs){
            req.id = tokeninputs.id
            next();
            return;
        }res.json({
            msg : "invalid token or authentication"
        })
        
    }catch(e){
        res.json({
            msg : e.message
        })
    }
}