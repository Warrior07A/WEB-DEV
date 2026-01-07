// const {usermodel,gamemodel} require ("./models.js")
import {usermodel,gamesmodel} from "./models.js"
import {authMiddleware} from "./authMiddleware.js";
import { SigninSchema } from "./types.js";
import express from "express";
// const express = require("express");
const app = express();
import jwt from "jsonwebtoken"
const SIGN = "akshat";
app.use(express.json());

app.post("/signup",async(req,res)=>{
    const {username,password} = req.body;
    const {success,data} = SigninSchema.safeParse(req.body);
    if (!success){
        res.status(400).json({
            mssg: "Incorrect credentials"
        })
        return;
    }
    const usercreate = await usermodel.create ({
        username: username,
        password:password
    })
})

app.post("/signin",(req,res)=>{
    const {username,password} = req.body;
    const found = usermodel.find((e)=>e.username == username)
    if (found){
        const token = jwt.sign(username,SIGN);
        res.send(token);
    }
    else {
        res.send("Creds not found");
    }
})

app.post("/room",authMiddleware,(req,res)=>{

})

app.post("/join",authMiddleware,(req,res)=>{

})