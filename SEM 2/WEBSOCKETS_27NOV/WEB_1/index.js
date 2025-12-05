const {Websocketserver}  = require("ws");

const wss = new Websocketserver ({port:8080});

wss.on("connection" ,(ws)=>{
    ws.on("message",(message)=>{
        ws.send(message);
        ws.send(message);
    })
})