const express= require("express");
const app = express();
const fs= require("fs");

app.get("/" ,function(req,res){
    res.send("Welcome to my first Express server!");
})

app.get("/greet",function(req,res){
    const name = req.query.name;
    res.send("Hello"+name+"  nice to meet you!");
})

app.get('/write' ,function(req,res){
    const message = req.query.message;
    res.send(message);
    fs.writeFile("notes.txt",message,function(err,message){

    } )
})

app.get("/append",function(req,res){
    const msg2 = req.query.msg2;
    fs.appendFile("notes.txt",msg2,function(err,msg2){

    })
})

app.get("/read",function(req,res){
    fs.readFile("notes.txt","utf-8",(err,data)=>{
        if (data){
            res.send(data);
        }
        else{
            res.send(err);
        }
    })
})

app.get("/clear",function(req,res){
    fs.writeFile("notes.txt","",function(err,data){
        res.send(" ");
    })
})

let arr=[];
let users={};
app.get("/add-user", function(req,res){
    const name = req.query.name;
    const age = req.query.age;
    users[name] = age;
    arr.push(users);
    res.send("Users data added successfully");
    console.log(arr);
    // arr = JSON.stringify(arr);
    fs.readFile("users.txt","utf-8",(err,data)=>{
        console.log(data);
        
        fs.appendFile("users.txt",JSON.stringify(arr),function(err){
            console.log(arr);
        })
    })
})

let blockeduser={};

app.get("/check-user",function(req,res){
    const name = req.query.name;
    const age = req.query.age;
    if (parseInt(age) > 18){
        blockeduser[name] = true;
        res.send("Access granted");
    }
    else{
        res.send("You are blocked as your age is less.");
    }
})

let key = Object.keys(blockeduser);

app.get("/is-blocked",function(req,res){
    const name = req.query.name;
    for(let i=0;i<key.length;i++)
    {   
        if (blockeduser[i] == name){
            res.send(name+" is blocked");
        }
        else{
            res.send(name + " is not blocked");
        }
    }
})

app.get("/users",function(req,res){
        res.send(arr)
})

app.get("/clear-data",function(req,res){
    blockeduser={};
    res.send("All data cleared successfully");
})

app.get("/bonus2" ,function(req,res){
    const name = req.query.name;
    const age = req.query.age;
    fs.readFile("users.txt","utf-8",function(err,data){
        data = JSON.parse(data);
        console.log(data);
        for(let i=0;i<data.length;i++)
        {
            if (i.name == name){
                res.send(i.age);
            }
        }
    })
    
})
app.listen(3000);