import {WebSocketServer} from "ws";
import {usermodel} from "./models.js";
import { SECRET } from "./authmiddleware.js";
import jwt from "jsonwebtoken";
import {mongoose} from "mongoose";
const wss = new WebSocketServer({port:8080});
mongoose.connect("mongodb+srv://Warrior07A:UWrenGXgSprYx1ir@cluster0.ru0uizx.mongodb.net/chatapp");
const sockets =[];
wss.on("connection",(ws)=>{
    const userconnection={
        user_id : 0 ,
        ws : ws,
        rooms:[],
    }
    sockets.push(userconnection);
    ws.on("message",async(message)=>{
        try{
                message = JSON.parse(message)
            }catch(e){
                ws.send(JSON.stringify({status:"failed",mssg: "message is invalid"}));
                return;
            }
        if (message.type == "join"){
            // console.log("hello");
                const token = message.payload.token;
                if (token){
                    const tokeninputs = jwt.verify(token,SECRET);
                    const _id = tokeninputs._id;
                if (!userconnection.user_id){
                    userconnection.user_id = _id;
                }
                
                const room_id = message.payload.room_id;
                
                const user = await usermodel.findOne({
                    _id : _id
                })
                if (user){
                    userconnection.rooms.push(room_id);
                    // if(user.rooms && user.rooms.includes(room_id)){
                        // sockets.forEach((conn)=>{
                            // if (conn.user_id == _id){
                                // conn.rooms.push(room_id);
                            // }
                        // })
                        ws.send(JSON.stringify({status:"passes",msg:"you have been added to the room"}));
                // }else{
                        // ws.send(JSON.stringify({status:"failed",mssg: "user is not found"}));
                // }
                }
                }
                else{
                    ws.send(JSON.stringify({msg : "token is invalid"}));
                }}
        else if (message.type == "chat"){
                const token = message.payload.token;
                const room_id = message.payload.room_id;
                if (token){
                    const tokeninputs = jwt.verify(token,SECRET);
                    const _id = tokeninputs._id;
                if (!userconnection.user_id){
                    userconnection.user_id = _id;
                }
                const textmessage = message.payload.message;
                const user = await usermodel.findOne({
                    _id : _id
                })
                if (user){
                    // Only send to other users in the room, not the sender
                    const othersockets = sockets.filter((conn)=>
                        conn.rooms.includes(room_id) && 
                        conn.user_id 
                        // conn.user_id.toString() !== _id.toString()
                    );
                    othersockets.forEach((conn)=>{
                        conn.ws.send(JSON.stringify({status:"successfull" , sentby : user.username, msg : textmessage}))
                    })
                }      
        }
        }
    })
})
