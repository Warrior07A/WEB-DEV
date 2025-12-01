const websocket = require("ws");
const express = require("express");
const http =  require("http");
import {mainlogic} from "./logic";
// import "./logic";
const app = express();

app.use(express.json());


const server = http.createServer(app);

const wss = new websocket.Server({
  server 
});

let game =[];
for(let i=0;i<3;i++)
{
    game[i]=[];
    for(let j=0;j<3;j++){
        game[i][j] = "_";
}
}

function printgame(ws){
        ws.send((game[0][0] + " " + game[0][1] + " " + game[0][2]  + " " + '\n'+ game[1][0] + " " + game[1][1] + " " + game[1][2]  + "\n" + game[2][0] + " " + game[2][1] + " " + game[2][2]  + " ").toString());

}
let check_opp = 1;
const array = [];
    const num = 0;
    wss.on("connection",ws=>{
        array.push(ws);
        ws.on("message",m=>{
            m = JSON.parse(m);
            let i = m.i;
            let j = m.j;
            console.log(m);
            // array.forEach((c)=>{
                const index = array.indexOf(ws);
                if (check_opp !=index )
                {
                    check_opp = index;
                    if (index == 0){
                            logic(i,j,ws,index);
                    } 
                    else{
                        logic(i,j,ws,index)
                    }
                    array.forEach((client)=>{
                        printgame(client);
                    })
                }
                else{
                    ws.send("not your turn");
                }
                
            // })
        })
        
    })
    
    server.listen(8080,'0.0.0.0',()=>{
        console.log("running on port 8080");
    });
    
    