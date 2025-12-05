const express = require("express");

const jwt = require("jsonwebtoken");;

const app = express();

let users={};

app.use(express.json());

app.post("/signup",(req,res)=>{
    const {username,password} = req.body;
    
})

app.post("/signin",(req,res)=>{
    
})

app.post("/signup",(req,res)=>{
    
})



app.listen(3000);