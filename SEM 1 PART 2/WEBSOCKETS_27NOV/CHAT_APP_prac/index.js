import express from "express";
import { SignupSchema } from "./types.js";
import { usermodel, roommodel } from "./models.js";
import mongoose from "mongoose";
import { SECRET } from "./authmiddleware.js";
import { authmiddleware } from "./authmiddleware.js";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());   

await mongoose.connect("mongodb+srv://Warrior07A:UWrenGXgSprYx1ir@cluster0.ru0uizx.mongodb.net/chatapp")
app.post("/signup",async(req,res)=>{
    const {success,data} = SignupSchema.safeParse(req.body);
    if (!success){
        res.send("wrong inputs");
        return;
    }
    console.log(data);
    const found = await usermodel.findOne({
        username: data.username
    })
    if (found){
        res.json("user already exits");
        return;
    }
    const user = await usermodel.create({
        username:data.username,
        password:data.password
    })    
    if (user) {
        res.send("user has been created successfully");
    }
})

app.post("/signin",async(req,res)=>{
    const {success,data} = SignupSchema.safeParse(req.body);
    if (!success){
        res.send("invalid inputs TRY AGAIN");
        return;
    }
    const user = await usermodel.findOne({
        username : data.username
    })
    if (user){
        const _id = user._id;
        const token = jwt.sign({_id},SECRET);
        res.send(token);        
    }
    else{
       res.send("user not found")
    }
})

app.post("/room",authmiddleware,async(req,res)=>{
    const _id = req._id;   
    const {room_id} = req.body; 
    
    if (!room_id){
        res.status(400).json({"msg":"room_id is required cannot be empty"});
        return;
    }
    // Find existing room document for user or create new one, and add room_id to rooms array
    const room_add = await usermodel.findOneAndUpdate(
        {_id : _id},
        {$addToSet : {rooms : room_id}  },
        {upsert : true,new : true}
    )
    console.log(room_add);
    res.json({ message: "Room added successfully", room: room_add });
})

app.listen(3000);
