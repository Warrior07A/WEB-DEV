const Websocket = require("ws");

// const Server = new Websocket.Server({
//     port: 8080
// });
// const arr = [];

// Server.on("connection", ws => {
//     arr.push(ws);
//     ws.on("message", ms => {
//         ms = ms.toString();
//         arr.forEach(c => {
//             c.send(ms);
//         })
//     })
// })


// functions 
// varibles


// access modifier

class WebSocketManager {
    wss; // web socket server
    arr = [];
    constructor() {
        this.wss = new Websocket.WebSocketServer({
            port: 8080
        })
        console.log("socket server is up is : ", 8080);
        this.init_websocket_connections();
    }

    init_websocket_connections() {
        this.wss.on('connection', (ws) => {
            this.arr.push(ws);
            console.log('Client connected. Total:', this.arr.length);
            this.setup_ws_listeners(ws);
        })
    }

    setup_ws_listeners(ws) {
        ws.on("message", (ms) => {
            try {
                const parsed = JSON.parse(ms.toString());
                console.log("parsed message is:", parsed);
                const messageToSend = JSON.stringify(parsed);
                
                this.arr.forEach(e => {
                    if (e !== ws && e.readyState === WebSocket.OPEN) {
                        e.send(messageToSend);
                    }
                });
            } catch (err) {
                console.error('Invalid JSON:', err);
            }
        });
    }
}


const my_wss = new WebSocketManager();






// move -> i,j

// _ _ _
// _ _ _
// _ _ _





