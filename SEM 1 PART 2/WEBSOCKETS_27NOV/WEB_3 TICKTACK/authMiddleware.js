import {usermodel,gamesmodel} from "./models.js"

export function authMiddleware(){(req,res,next)=>{
    const {username,password } = req.body;
    const found =  usermodel.find(u =>u.username == username);
    if (found)
    {
        const token = jwt.verify(token,"akshat")
        req.token = token;
        next();
    }
    else {
        res.send("Creds not found");
    }
}}

