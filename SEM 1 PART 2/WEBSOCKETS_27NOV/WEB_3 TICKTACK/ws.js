const websocket = require("ws");
const express = require("express");
const http =  require("http");
const app = express();

app.use(express.json());
const server = http.createServer(app);

const wss = new websocket.Server({
  server 
});
function close(){()=>{
    console.log("Server has been closed");
    wss.close()
}}

function win(player){
        
    for (let i=0;i<3;i++){
        //rows
        if (game[0][i]==player && game[1][i]==player && game[2][i]==player){
            return true;
        }   
        //columns
        else if (game[i][0]==player && game[i][1]==player && game[i][2]==player){
        return true;    
        }
    }    //diaongals
    if (game[0][0]==player && game[1][1]==player && game[2][2]==player){
        return true;
    }
    else if (game[0][2]==player && game[1][1]==player && game[2][0]==player){
        return true;
    }
    return false;
}

function logic(i,j,ws,index) {	
    let cnt=0;
    for (let i=0;i<3;i++){
        for (let j=0;j<3;j++){
            if (game[i][j]!='_'){
                cnt++;
            }
        }
    }
    if (index == 0){
        if (game[i][j]=="_"){
            game[i][j]= "✅";
        }
        else{
            ws.send("enter correct indexes");
        }
    }
    else{
        if (game[i][j]=="_") {
            game[i][j]= "❌";
        }
        else{
            ws.send("enter correct indexes");
        }
    }

    //X WON 
    if(win("✅")){
        array.forEach((client)=>{
            client.send("Player ✅ has won");
        })
        close();
    }
    //o  won 
    else if (win("❌")){
        array.forEach((client)=>{
            client.send("Player ❌ has won");
        })
        close();
    }
    //draw
    else if (cnt==9){
        array.forEach((client)=>{
            client.send("IT is a draw");
        })
        close();
    }

}

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
    
    