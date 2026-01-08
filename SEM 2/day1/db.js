import {mongoose } from "mongoose";
mongoose.connect("mongodb+srv://Warrior07A:UWrenGXgSprYx1ir@cluster0.ru0uizx.mongodb.net/new");

const todoSchema = new mongoose.Schema({
    title : String,
    desc : String,
    completed: Boolean
})
const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    todos : [todoSchema]
})

export const usermodel = mongoose.model("user", userSchema);