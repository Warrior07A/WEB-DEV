import jwt from "jsonwebtoken";
import { usermodel } from "./models.js";
export const SECRET = "akshat123";


export async function authmiddleware(req,res,next){
    const token = req.headers.token;
    const tokeninputs = jwt.verify(token,SECRET);
    const _id = tokeninputs._id;
    const user = await usermodel.findOne({
        _id : _id
    })
    if (!user) {
        res.send("user not found ");
        return;
    }
    req._id = _id;
    next();    
}