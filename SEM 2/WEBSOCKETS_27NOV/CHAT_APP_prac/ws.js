import {WebSocketServer} from "ws";
import { usermodel } from "./models.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { SECRET } from "./authmiddleware.js";
await mongoose.connect("mongodb+srv://Warrior07A:UWrenGXgSprYx1ir@cluster0.ru0uizx.mongodb.net/chatapp")
const wss = new WebSocketServer({port:8080});
const sockets = [];
let cntr = 1;

wss.on("connection",async(ws)=>{
    cntr++;
    const userconnection = {
        ws : ws,
        rooms:[],
        id : cntr,
        user_id : 0
    }
    sockets.push(userconnection);
    ws.on("message",async(data)=>{
        try {
            data = JSON.parse(data);
            
            if (data.type == "auth"){
                const token = data.payload.token;
                const tokeninputs = jwt.verify(token,SECRET);
                const _id = tokeninputs._id;
                const found = await usermodel.findOne({
                    _id : _id
                })
                if (found){
                    userconnection.user_id = _id;
                    ws.send(JSON.stringify({type: "auth", status: "success", message: "user is found you can proceed"}));
                }
                else {
                    ws.send(JSON.stringify({type: "auth", status: "error", message: "user is not found"}));
                }
            }
            else if (data.type == "join"){
                const token = data.payload.token;
                const tokeninputs = jwt.verify(token,SECRET);
                const _id = tokeninputs._id;
                const room_id = data.payload.room_id;
                
                if (!room_id) {
                    ws.send(JSON.stringify({type: "join", status: "error", message: "room_id is required"}));
                    return;
                }
                
                // Verify user exists and check if room_id exists in user's rooms array
                const found = await usermodel.findOne({
                    _id : _id
                })
                
                if (!found){
                    ws.send(JSON.stringify({type: "join", status: "error", message: "user not found"}));
                    return;
                }
                
                // Check if room_id exists in user's rooms array
                const room_exists = found.rooms && found.rooms.includes(room_id);
                
                if (room_exists){
                    // Find the user's websocket connection by the current ws object
                    const userConnection = sockets.find(conn => conn.ws === ws);
                    
                    if (userConnection){
                        // Store user_id in connection if not already stored
                        if (!userConnection.user_id) {
                            userConnection.user_id = _id;
                        }
                        // Add room to user's websocket connection if not already added
                        if (!userConnection.rooms.includes(room_id)){
                            userConnection.rooms.push(room_id);
                        }
                        ws.send(JSON.stringify({type: "join", status: "success", message: `Successfully joined room: ${room_id}`, room_id: room_id}));
                    } else {
                        ws.send(JSON.stringify({type: "join", status: "error", message: "WebSocket connection not found"}));
                    }
                } else {
                    ws.send(JSON.stringify({type: "join", status: "error", message: `Room ${room_id} not found in your rooms list`}));
                }
            }

            else if (data.type == "chat"){
                const token = data.payload.token;
                const tokeninputs = jwt.verify(token,SECRET);
                const _id = tokeninputs._id;
                const message = data.payload.message;
                const room_id = data.payload.room_id;
                
                if (!message){
                    ws.send(JSON.stringify({type: "chat", status:"error", message : "message cannot be empty"}));
                    return;
                }
                
                if (!room_id){
                    ws.send(JSON.stringify({type: "chat", status:"error", message : "room_id is required"}));
                    return;
                }
                
                // Find the sender's connection to verify they're in the room
                const senderConnection = sockets.find(conn => conn.ws === ws);
                if (!senderConnection || !senderConnection.rooms.includes(room_id)){
                    ws.send(JSON.stringify({type: "chat", status:"error", message : "You are not in this room"}));
                    return;
                }
                
                // Filter sockets: users in the same room, excluding the sender
                const othersockets = sockets.filter((conn) => 
                    conn.user_id && 
                    conn.user_id.toString() !== _id.toString() && 
                    conn.rooms.includes(room_id)
                );
                
                if (othersockets.length === 0){
                    ws.send(JSON.stringify({type: "chat", status:"error", message : "no other users found in this room"}));
                    return;
                }
                
                // Send message to all other users in the room
                const chatMessage = {
                    type: "chat",
                    room_id: room_id,
                    message: message,
                    sender_id: _id
                };
                
                othersockets.forEach((conn)=>{
                    conn.ws.send(JSON.stringify(chatMessage));
                });
                
                ws.send(JSON.stringify({type: "chat", status: "sent", message: "Message sent successfully"}));
            }
            else if (data.type == "leave"){
                const token = data.payload.token;
                const room_id = data.payload.room_id;
                
                // Find user connection and remove room
                const userConnection = sockets.find(conn => conn.ws === ws);
                if (userConnection && room_id){
                    userConnection.rooms = userConnection.rooms.filter(room => room !== room_id);
                    ws.send(JSON.stringify({type: "leave", status: "success", message: `Left room: ${room_id}`}));
                }
            }
            else {
                ws.send(JSON.stringify({type: "error", message: "Unknown message type"}));
            }
        } catch (error) {
            console.error("WebSocket error:", error);
            ws.send(JSON.stringify({type: "error", message: error.message}));
        }
    })

    ws.on("close",()=>{
        // Remove user connection from sockets array when they disconnect
        const index = sockets.findIndex(conn => conn.ws === ws);
        if (index !== -1) {
            sockets.splice(index, 1);
        }
    })

})