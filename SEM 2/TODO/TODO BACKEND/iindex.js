const express = require("express")
const cors = require("cors");
const app = express();
const fs = require("fs");
const e = require("express");

app.use(cors());

let todos = [];

app.use(express.json());

app.get("/",function(req,res){
    res.send("Welcome to TODO Backend");
})

let number = 1;

app.post("/add-todo",function(req,res)
{   
    const task = req.query.task;
    todos.push({id : number , task : task ,completed : false})
    const sendmessage = {
        message : "TODO added successfully !",
        todoCount : number
        ,};
    res.status(201).json(sendmessage);
    number++;
    console.log(todos);
    // res.send("requst received");
})

app.get("/todos", function(req,res){
    if (todos.length == 0){
        res.send("NO todos found yet");
    }
    else {
        res.json(todos);
    }
})

app.get("/todo/:id",function(req,res)
{
    const id = req.params.id;
    const todo = todos.find(item => item.id == id);
    if (todo)
    {
        res.status(200).json(todo);
    }
    else {
        res.status(404).json({error: "TODO NOT FOUND"});
    }
})

app.post("/todo/:id/complete",function(req,res)
{
    const id = req.params.id;
    const todo = todos.find(item => item.id == id);
    if (todo)
    {
        todo.completed = true;
    }
    const response = {message : "TODO marked as completed",todo }
    if (todo) res.status(200).json(response);
    else res.status(404);
})

app.delete("/todo/:id",function(req,res)
{
    const id = req.params.id;
    const index = todos.findIndex(item => item.id == id)
    console.log(index);
    if (index>=0)
    {
        todos.splice(index,1);
        res.json({ message: "TODO deleted successfully!" });
    }
    else{
        res.status(404).json({ error: "TODO not found" });
    }
})

app.get("/todos/filter",function(req,res)
{
    const status = req.query.status;
    if (status == "completed")
    {
        const comp_todos = todos.filter(item => item.completed);
        res.send(comp_todos);
    }
    else if (status == "pending"){
        const comp_todos = todos.filter(item => !item.completed);
        res.send(comp_todos);
    }
    else {
        res.json({ message: "No TODOs found for the given filter." });
    }
})

app.post("/save-todos",function(req,res)
{
    const data = JSON.stringify(todos);
    fs.writeFile("todos.json",data,(err)=>
    {
        res.json({ message: "All TODOs saved to file successfully!" });
    }
)
})

app.post("/load-todos",function(req,res)
{
    fs.readFile("todos.json",function(err,data){
        const contents = JSON.parse(data);
        console.log(contents);
        contents.forEach(item => todos.push(item))
        // if (pushing)
        // {
            res.json({ message: "TODOs loaded from file successfully!", todoCount: todos.length });
            console.log(todos);
        // }
        if (err)
        {
            res.status(404).json({ error: "No saved TODOs found!" });
        }
    })
})          

app.delete("/clear-todos",function(req,res)
{
    todos=[];
    res.json({ message: "All TODOs cleared!" });
})

app.get("/stats",function(req,res)
{
    const completed = todos.filter(item => item.completed);
    const statis = {"total" : todos.length, "completed" : completed.length , "pending" : todos.length - completed.length};
    res.json(statis);
})

app.listen(3000);
