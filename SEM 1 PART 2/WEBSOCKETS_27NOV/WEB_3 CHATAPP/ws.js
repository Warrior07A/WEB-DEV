const {websocket} = require("ws");

const wss = websocketsocket({port:8080});

wss.on("connection",(ws)=>{
    ws.on("message",(message)=>{
        
    })
})