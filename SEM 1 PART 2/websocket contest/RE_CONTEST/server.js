import { WebSocketServer } from "ws";
import {JWT_SECRET} from "./index.js";
import jwt from "jsonwebtoken";
// el } from "./db.js";
const wss = new WebSocketServer({port : 8080});
import { usermodel,quizmodel } from "./db.js";
import mongoose from "mongoose";
mongoose.connect("mongodb+srv://Warrior07A:UWrenGXgSprYx1ir@cluster0.ru0uizx.mongodb.net/quizapp")
let liveQuizzes = {};
// const liveQuizzes = {
//     "quiz123": {
//       quizId: "quiz123",
//       title: "Node.js Basics",
//       currentQuestionId: null,
//       questions: [
//         {
//           id: "q111",
//           text: "What is Node.js?",
//           options: ["Runtime", "Framework", "Library"],
//           correctOptionIndex: 0,
//         }
//       ],
//       users: {
//         "u123": { ws, name: "Rahul", score: 0, answeredCurrent: false },
//         "u124": { ws, name: "Jane", score: 0, answeredCurrent: false }
//       },
//       answers: {
//         "q111": {} // userId -> selectedOptionIndex
//       }
//     }
//   };
function decodeurl(ws,req){
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');
    const quizId = url.searchParams.get('quizId');
    return {token,quizId};
}
function printerror (ws){
    ws.send(JSON.stringify({
        "type": "ERROR",
        "success": false,
        "message": "Unauthorized or invalid data"
      }))
}
function verifytoken(token,ws){
    try{
        let tokeninputs = jwt.verify(token,JWT_SECRET);
        let userId =  tokeninputs._id;
        let role = tokeninputs.role;
        return {userId , role , error : null};
    }catch(e){
        printerror(ws)
        return { id : null , role : null, error : e}
        ws.close();
    }
}
async function userdatafetch(userId){
    try{
        const userdata = await usermodel.findOne({
            _id : userId
        })
        return userdata;
    }catch(e){
        printerror()        
    }
}

async function adduseranddata(quizId,userdata,ws,role){
    let quizdata = await quizmodel.findOne({
        _id : quizId 
    })
    let userobj = {
        name : userdata.name,
        ws : ws,
        score : 0,
        answeredcorrect : false
    }
    if (!liveQuizzes[quizId]){
        liveQuizzes[quizId] = quizdata.toObject();
    }
    if (role != "admin"){
        liveQuizzes[quizId]["users"]={};
        liveQuizzes[quizId]["users"][userdata._id] = userobj;
    }
}

function startquiz(ws,quizId){
    try{
        let quizcheck = quizmodel.findOne({
            _id : quizId
        })
        ws.send(JSON.stringify({
            "type": "QUIZ_STARTED",
            "quizId": quizId,
            "message": "Quiz is now live"
            }));
    }catch(e){
            printerror(ws);
    }
}

function showques(ws,quizId,questionsId){
    console.log(liveQuizzes);
    // let ques = liveQuizzes[quizId]["questions"].find((ques)=> {
    //     if(ques._id == questionsId) return true; 
    // })
    // if (!ques){
    //     printerror(ws);
    //     return;
    // }
}
wss.on("connection",async(ws,req)=>{
    try{
        let {token,quizId} = decodeurl(ws,req);
        let {userId, role ,error} = verifytoken(token,ws);
        let userdata = await userdatafetch(userId)
        await adduseranddata(quizId,userdata,ws,role);
        if (role == "admin"){
            ws.on("message",(data)=>{
                data = JSON.parse(data);
                if (data.type == "START_QUIZ"){
                    startquiz(ws,quizId)
                }
                if (data.type == "SHOW_QUESTION"){
                    let givenquizId = data.quizId;
                    let questionId = data.questionId;
                    showques(ws,givenquizId,questionId);
                }
            })
        }
    }catch(e){
        printerror(ws);
        ws.close();
        return;
    }


})