const express=require("express")

const app= express();
const input1 = document.getElementById("input1").value;
const input2 = document.getElementById("input2").value;

function mul (){
    app.get("/multiply",function(req,res){
        // const a = req.query.a;
        // const b = req.query.b;
        // const mul = parseInt(a) * parseInt(b);
        // res.send(mul);
        res.send(parseInt(input1) * parseInt(input2));
    })
}


app.get("/sumupto" , function(req,res){
    const a = req.query.a;
    // const b = req.query.b;
    const an = parseInt(a);
    const sumupto = (an * (an+1))/2;
    res.send(sumupto);
})

// app.get("/myself",function(req,res){
//     res.send());
// })
// app.listen(3000);