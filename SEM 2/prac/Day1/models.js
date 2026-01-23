import mongoose, { Mongoose } from "mongoose";

mongoose.connect("psql 'postgresql://neondb_owner:npg_C6aftZ5lQgjS@ep-aged-moon-a4slrtu8-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'");

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

