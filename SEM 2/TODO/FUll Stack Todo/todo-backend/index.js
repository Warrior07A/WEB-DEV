const express = require("express");
const cors= require("cors");
const app = express();
const fs = require("fs");

app.use(cors());
app.use(express.json());
let todos = [];

todos = JSON.parse(fs.readFileSync("data.json","utf-8") || '[]');

app.get("/todos",function(req,res)
{
  res.json(todos);
})


app.post("/todos", function(req, res) {
  const task = req.body.task;
  const todoinput = { id: Math.ceil(Math.random()*100), task: task, completed: false };
  const added = todos.push(todoinput);
  if (added) res.send("new todo has been added");
  else res.send("error");
  fs.writeFile("data.json",JSON.stringify(todos),function(err){});
});

app.put("/todos/:id",function(req,res)
{
  const id = req.params.id;
  const todo = todos.find(item => item.id == id)
  console.log(id, todo)
  if (todo)
  {
    todo.completed = true;
    fs.writeFile("data.json",JSON.stringify(todos),function(err){});
    res.send("Todo has been completed");
    return
  }
  res.send("Erorr! todo not found");
})

app.delete("/todos/:id",function(req,res)
{
  const id = req.params.id;
  const index = todos.findIndex(item => item.id == id)
  todos.splice(index,1);
  fs.writeFile("data.json",JSON.stringify(todos),function(err){});
})

app.listen(3000);