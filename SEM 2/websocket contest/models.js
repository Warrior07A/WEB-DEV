import {mongoose} from "mongoose";
const UserSchema = new mongoose.Schema ({
    "name": {type : String,required : true},
    "email": {type: String,required : true},
    "password": {type: String,required : true},
    "role": {type: String,required : true}
})
const QuestionsSchema = new mongoose.Schema({
    "text": {type : String,required : true},
    "options": [String],
    "correctOptionIndex": Number
})


const QuizSchema = new mongoose.Schema({
    "title": {type : String,required : true},
    "questions": [QuestionsSchema]
})

export const usermodel = mongoose.model("Users",UserSchema);
export const quizmodel = mongoose.model("Quiz",QuizSchema);