import {usermodel,gamesmodel} from "./models.js"
import {authMiddleware} from "./authMiddleware.js";
import { SignupSchema , SigninSchema } from "./types.js";

import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
const app = express();
const SIGN = "akshat123";

app.use(express.json());

app.post("/signup",async(req,res)=>{
    const {success,data} = SignupSchema.safeParse(req.body);
    try{
        if (!success){
            res.status(400).json({
                mssg: "Incorrect credentials"
            })
        }
    }
    catch(e){
        res.send(e);
    }
    try{
        const usercreate = await usermodel.create ({
            username: data.username,
            password:data.password
        })
        res.send("user has been created")
    }
    catch(e){
        res.send(res.send("user already exists"));
    }
})

app.post("/signin",async(req,res)=>{
    const {username,password} = req.body;
    const found = await usermodel.find({username:username});
    const _id = found[0]._id;
    if (found){
        const token = jwt.sign({_id},SIGN);
        res.send(token);
    }
    else {
        res.send("Creds not found");
    }
})

app.post("/room",authMiddleware,async(req,res)=>{
    const token = req.token;
    const _id = req._id;
    const title = req.body.title;
    // console.log(_id);
    // console.log(_id);
    const room = await gamesmodel.create({
        title: title,
        player1 : _id,
        moves:[
            {
                x : 0,
                y : 0
            }
        ]
    })
    const room_id = room._id;
    if (room) res.json("rooom has been created with roomid " + room_id);
    else res.json("room not created");
}) 

app.post("/join" , authMiddleware , async(req,res)=>{
    const room_id = req.body.room_id;
    const room = await gamesmodel.findOne({
        _id : room_id
    });
    console.log(room.player1);
    console.log(room.player2);
    console.log(new mongoose.Types.ObjectId(req._id),"DONE");
    if (new mongoose.Types.ObjectId(req._id).equals(room.player1) ||  (new mongoose.Types.ObjectId(req._id).equals(room.player2) ) ){
        res.send("room is already full");
        return ;
    }
    else{
        room.player2 = req._id;
        await room.save();
        res.send("You have joined the room ");
    }
})

app.listen(3000);