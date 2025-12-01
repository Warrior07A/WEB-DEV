function mainlogic(){
    function close(){
        wss.close(()=>{
            console.log("Server is closed and not crashed");
        })
    }
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
}

export default module(
    mainlogic
)