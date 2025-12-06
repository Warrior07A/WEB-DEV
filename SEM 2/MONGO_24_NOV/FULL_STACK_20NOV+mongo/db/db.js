const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Warrior07A:UWrenGXgSprYx1ir@cluster0.ru0uizx.mongodb.net/");

const Schema = mongoose.Schema;
const Objectid = Schema.Objectid;

const Users = new Schema({
    username: String,
    password: String,
    email : String,
    todos:[String]
})

const Todo = new Schema({
    userId : Objectid,
    title : String,
    done : Boolean
})

const Usermodel = mongoose.model("users",Users);
const Todomodel = mongoose.model("todo",Todo);

module.exports={
    Usermodel,
    Todomodel
}