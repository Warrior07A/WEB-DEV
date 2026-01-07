import mongoose, { Mongoose } from "mongoose";

mongoose.connect("");

const UserSchema = new mongoose.Schema({
    "name" : String,
    "email" : String,
    "password" : String,
})

const todoSchema = new mongoose.Schema({
    "title" : String,
    "descr" : String,
    "completed" : Boolean,
})

export const usermodel = mongoose.model("users" , UserSchema);
export const todomodel = mongoose.model("todo" , todoSchema);

