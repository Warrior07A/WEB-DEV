import {WebSocketServer} from "ws";
import mongoose from "mongoose";
mongoose.connect("mongodb+srv://Warrior07A:UWrenGXgSprYx1ir@cluster0.ru0uizx.mongodb.net/menti");
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./authiddleware.js";
import { usermodel ,quizmodel} from "./models.js";
import {URL} from "url";

const wss = new WebSocketServer({port:3001});
let token;
let quizId;
let quiz_data ;
let liveQuizzes={};
function urlresolver(request){
  const url = new URL(request.url, `http://${request.headers.host}`);
  token = url.searchParams.get("token");
  quizId = url.searchParams.get("quizId");
  // console.log(token);
  // console.log(quizId);
}
async function quizmemory(){
  let data = await quizmodel.findOne({
    _id : quizId
  })
  liveQuizzes[quizId] = data;
}
quizmemory();
let role ,user_id;
let students_arr = [];
let admin_arr = [];
// let liveQuizzes[quizId] = {
//   quizId,
//   title,
//   hostId,                          
//   currentQuestionIndex: null,      
//   started: false,
  
//   questions: [
//     {
//       id: "q111",
//       text: "What is Node.js?",
//       options: ["Runtime", "Framework", "Library"],
//       correctOptionIndex: 0
//     },
//   ],

//   users: {                         
//     "u123": {
//       ws,                          
//       name: "Rahul",
//       score: 0,
//       answeredCurrent: false
//     }
//   },

//   answers: {                       // questionId → { userId → selectedOption }
//     "q111": {
//       "u123": 0,
//       "u124": 2,
//     }
//   }
// };


let memory_users =[];
async function tokenandidverify(ws){
    try{
        let verify = jwt.verify(token,JWT_SECRET);
        role = verify.role;
        user_id = verify._id;
        quiz_data = await quizmodel.findOne({
            _id : quizId
        })
      }catch(e){
        ws.json(JSON.stringify({
          "type": "ERROR",
          "success": false,
          "message": "Unauthorized or invalid data"
        }))
      }
      quiz_data = await quizmodel.findOne({
        _id : quizId
      })
      // console.log(quiz_data);
      return {role,user_id,quiz_data};
    }
async function errorcame(ws){
  ws.json(JSON.stringify({
    "type": "ERROR",
    "success": false,
    "message": "Invalid questionId or unauthorized"
  }))
}

async function show_ques (questionId,ws){
  let quiz_data = await quizmodel.findOne({
    _id : quizId
  })
  if (quiz_data){
    const questioninfo = quiz_data.findOne()({
      _id : questionId
    })
    if (!questioninfo){
      errorcame(ws);
      return;
    }
    students_arr.forEach((ws)=>{
      ws.json(JSON.stringify(
        {
          "type": "SHOW_QUESTION",
          "quizId": quizId,
          "questionId": questionId,
          "text": questioninfo.text,
          "options": questioninfo.options,
        })
      )
    })
    return;
  }
  errorcame(ws);
  return;
}

wss.on("connection",async(ws,request)=>{
    urlresolver(request);
    let {role,user_id,quiz_data} = await tokenandidverify(ws);
    let user_data = await usermodel.findOne({
      _id : user_id
    })
    console.log(liveQuizzes);
    liveQuizzes["users"]["user"] = {
        ws : ws,
        name : user_data.name,
        score : 0,
        answeredCurrent : false
    }
    console.log(liveQuizzes);
    if (role == "student"){
      let s1 = {ws:ws}
      students_arr.push(s1);
    }

    ws.on("message",(data)=>{
        data = JSON.parse(data);

        if (role == "admin"){
          if (data.type =="START_QUIZ"){
            ws.send(JSON.stringify(
                {
                    "type": "QUIZ_STARTED",
                    "quizId": data.quizId,
                    "message": "Quiz is now live"
                }
                ))
          }
          else if (data.type == "SHOW_QUESTION"){
            const ques_id = data.questionId;
            show_ques(questionId,ws)
          }
        }
        // else if (role == "student"){
          
        // }
        else{
            ws.json(JSON.stringify({
                "type": "ERROR",
                "success": false,
                "message": "Invalid questionId or unauthorized"
              }))
        }

    })

})