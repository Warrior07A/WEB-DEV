const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken")
const cors = require("cors");
const SECRET = "AKSHAT";
let users = [];
const app = express();  
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname,"../frontend/dist")));
app.use(cors());


function authmiddleware(req,res,next){             //auth middleware for verification //token verification
    const token = req.headers.token;
    try{
        const username = jwt.verify(token,SECRET);
        if (username){
            req.username = username;
            next();
        }
        else{
            res.send("Authentiction failed. User not found");
        }
    }catch{
        res.send("Authenctication failed. ")
    }
}

app.get("/*splat",(req,res)=>{
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));

})

app.post("/signup" ,(req,res)=>{
    const {username, password, email} = req.body;
    const found = users.find(u => u.username === username || u.email === email)
    if (found){
        res.json("User already exists");
    } 
    else{
        let obj ={"username" : username , "password" : password , "email" : email ,"todos":[]}
        users.push(obj);
        res.json("You have Signed Up");
    }
})

app.post("/signin",(req,res)=>{ 
    const {username,password,email} = req.body;
    const found = users.find(u => u.username == username)
    if (found){
        const token = jwt.sign({username},SECRET);
        res.json(token);
    }
    else{
        res.json("User doesn't exist");
    }
})

app.post("/dashboard",authmiddleware,(req,res)=>{
    const username = req.username.username;
    const user = users.find(u => u.username === username)
    console.log(user.todos);
    if(user)
    {
        res.json(user.todos);
    }
    else{
        res.json("add more todos to fill");
    }
})

app.post("/todos",authmiddleware,(req,res)=>{
    const token = req.header.token;
    const todo = req.body.todo;
    const username = req.username.username;
    const found = users.find(e =>e.username === username);
    if (found){
        found.todos.push(todo);
        res.json("todo added");
    }
    else{
        res.json("error occured");
    }

})

app.listen(3000);