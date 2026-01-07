const fs=require("fs");

fs.readFile("a.txt","utf-8",(err,data)=>{
    let sum=0;
    for(let i=0;i<data;i++){
        sum+=i;
    }
    sum=sum.toString()
    
    fs.writeFile("b.txt",sum,"utf-8",(err)=>{
        if (err){
            console.log(err)
        }

        fs.readFile("b.txt","utf-8",(err2,data2)=>{
            JSON.parse(data2);
            let sq=data2*data2;

            fs.writeFile("c.txt",sq.toString(),(err3)=>{
                if (err3){
                    console.log(err3)
                }
            })
        })
    })
})
