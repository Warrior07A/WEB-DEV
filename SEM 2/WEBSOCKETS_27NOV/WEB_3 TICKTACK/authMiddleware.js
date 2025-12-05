import jwt from "jsonwebtoken";
const SIGN = "akshat123"
import {usermodel,gamesmodel} from "./models.js"

export async function authMiddleware(req,res,next){
    const token = req.headers.token;
    const tokeninputs = jwt.verify(token,SIGN);
    // console.log(tokeninputs);
    // console.log(tokeninputs);
    const found =  await usermodel.find({_id:tokeninputs._id});
    // console.log(found);
    if (found)
    {
        req.token = token;
        req._id = tokeninputs._id;
        next();
    }
    else {
        res.send("Creds not found");
    }
}

