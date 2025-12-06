const express= require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

let users=[];
app.use(express.json());

users = JSON.parse(fs.readFileSync("data.json","utf-8",function(err,data){}) || "[]");


app.use(cors())
let usercounter = Math.ceil(Math.random()*100);

app.post("/signup",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    
    users.push({
        username:username,
        password:password,
        id:usercounter,
        todos:[]
    })
    res.send("user has been signed in");
    fs.writeFile("data.json",JSON.stringify(users),function(err,data){
    })
})

app.get("/all",function(req,res)
{
    res.json(users);
})


app.get("/todo/:userid",function(req,res)
{
    const userid = req.params.userid;
    const found = users.find(item => item.id == userid)
    if (found)
    {
        res.json(found.todos);
        fs.writeFile("data.json",JSON.stringify(users),function(err,data){});
    }
    else{
        res.send("user not found");
    }
})


app.post("/todo/:id",function(req,res){
    const id = req.params.id;
    const task = req.body.task;
    const found = users.find(item => item.id == id)
    if (found) {
        found.todos.push({taskid: Math.ceil(Math.random()*100),task : task});
        res.send("task done");
        fs.writeFile("data.json",JSON.stringify(users),function(err,data){})
    }
    else{
        res.send("user not  found");
    }
})

app.delete("/todo/:userid/:todoid",function(req,res){
    const userid = req.params.userid;
    const todoid = req.params.todoid;
    const found = users.find(item=>item.userid)
    if (found) {
        const index = found.todos.findindex(item=> item.todoid)
        if (index > 0) {
            found.todos.splice(index,1);
            res.send("todo has been deleted");
            fs.writeFile("data.json",JSON.stringify(users),function(err,data){})

        }
        else{
            res.send("todo is not deleted");
        }
    }
})

app.listen(3000);