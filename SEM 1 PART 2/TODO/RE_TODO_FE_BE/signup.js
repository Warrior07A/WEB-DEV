const express= require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

app.use(express.json());
app.use(cors());

let db={users:[]};
db = JSON.parse(fs.readFileSync("data.json","utf-8") || JSON.stringify({users:[]}));

let id = db["users"].length + 1;

app.post("/signup",(req,res)=>{
    const {username,password} = req.body;
    const data = {"username":username,"password":password,"id":id,todos:[]}
    db["users"].push(data);
    id++;
    fs.writeFileSync("data.json",JSON.stringify(db),(err,data)=>{});
    res.json("You are signed Up ")
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
})

app.get("/signin",(req,res)=>{
    res.sendFile(__dirname + "/signin.html");
})

app.get("/dashboard/todos/id",(req,res)=>{
    res.sendFile(__dirname + "/dashboard.html");
})

app.get("/all",(req,res)=>{
    res.json(db);
})

app.get("/todos/:id",(req,res)=>{
    const id = req.params.id;
    const alltodo = db["users"].find(item =>  item.id == id);
    res.json(alltodo); 
})

app.post("/:id/todos",(req,res)=>{
    const id = req.params.id;
    const todo= req.body.todo;
    const person = db["users"].find(item=>item.id == id);
    person.todos.push(todo);
    fs.writeFileSync("data.json",JSON.stringify(db),(err,data)=>{});

    res.json("todo pushed successfully");
})


app.listen(3000);