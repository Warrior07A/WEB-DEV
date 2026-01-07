const express= require("express");
const app = express();

let totalrequest = 0;

let obj = {
    "/signin" : {
        requestcount:0,
        averagerequesttime : 0
    },
    "/signin":{
        requestcount:0,
        averagerequesttime : 0
    },
    "/todos ":{
        requestcount:0,
        averagerequesttime : 0
    },
    "DELETE":{
        requestcount:0,
        averagerequesttime : 0
    }
    ,
    "/stat":{
        requestcount:0,
        averagerequesttime : 0
    }

}

function aggregation (req,res,next){
    let url = req.originalUrl;
    console.log(obj.url);
    obj[req.originalUrl].requestcount++;
    let current = Date.now();

    next();
    obj[req.originalUrl].averagerequesttime = ((Date.now())- current) / (obj[req.originalUrl].requestcount)

}


app.use(aggregation);


app.get("/stats",(req,res)=>{

    res.send(obj);

})

app.post("/signup",(req,res)=>{
    res.send("signed up")

})

app.post("/signup",(req,res)=>{
    res.send("signin up")


})

app.get("/todos",(req,res)=>{
    res.send("no todos");


})



app.listen(3001);