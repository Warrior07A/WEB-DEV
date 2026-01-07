import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JWT_SECRET } from "./index.js";
import { usermodel } from "./db.js";

export async function authmiddleware (req,res,next){
    const token = req.headers.authorization;
    try{
        const userexist = jwt.verify(token,JWT_SECRET);
        console.log(userexist);
        const _id = userexist._id;
        const role = userexist.role;
        req._id = _id;
        req.role = role;
        next();
    }catch(e){
        res.status(401).json({
            "success": false,
            "error": "Unauthorized, token missing or invalid"
          })
    }

}