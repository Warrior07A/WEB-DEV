import {mongoose } from "mongoose";
mongoose.connect("mongodb+srv://Warrior07A:UWrenGXgSprYx1ir@cluster0.ru0uizx.mongodb.net/quizapp");

const userSchema = new mongoose.Schema({
    name : {type : String,required :true},
    email : {type : String,required :true},
    password : {type : String,required :true},
    role : {type : String,required :true}

})

const quesSchema = new mongoose.Schema ({
    text : {type : String,required :true},
    options : [{type : String,required :true}],
    correctOptionIndex : {type : Number,required : true}
})


const quizSchema = new mongoose.Schema ({
    title : {type : String,required :true},
    questions : [quesSchema]
})


export const usermodel = mongoose.model("users",userSchema);
export const quizmodel = mongoose.model("ques",quizSchema);