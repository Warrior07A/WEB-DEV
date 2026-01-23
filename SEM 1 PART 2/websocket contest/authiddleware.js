import jwt from "jsonwebtoken";
export const JWT_SECRET = "akshat123";
import mongoose from "mongoose";
import { usermodel,quizmodel } from "./models.js";

export async function authmiddlware(req,res,next){
    const token = req.headers.authorization;
    let tokeninputs;
    try{
        tokeninputs = jwt.verify(token,JWT_SECRET);
    }catch(e){
        res.status(401).json({
            "success": false,
            "error": "Unauthorized, token missing or invalid"
        })
        return;
    }
    const _id = tokeninputs._id;
    let founduser = await usermodel.findOne({
            _id : _id
    });
    const role = tokeninputs.role;
    if (!founduser){
        res.status(401).json({
            "okay" : "2",
            "success": false,
            "error": "Unauthorized, token missing or invalid"
          })
          return;
        }
    req._id = _id;
    req.role = role;
    next();
}

