const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://Warrior07A:UWrenGXgSprYx1ir@cluster0.ru0uizx.mongodb.net/");

const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    todos : [String]
})

const userModel = mongoose.model("users",userSchema);

app.post("/signup",async(req,res)=>{
    const {username,password} = req.body;
    const user = await userModel.create({
        username:username,
        password:password,
        todos:[]
    })    
    if (user._id)
    {
        res.json(user._id);
    }
    else{
        
    }
})

app.post("/signin",(req,res)=>{
    const {username,password} = req.body;
    // userModel.
})

app.post("/todo",(req,res)=>{

})

app.get("/todos",(req,res)=>{

})

app.listen(3000);