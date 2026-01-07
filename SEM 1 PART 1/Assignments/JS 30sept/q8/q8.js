// ### **Q8. File Backup**

// - Write a program that:
//     1. Reads `important.txt`.
//     2. Creates a backup copy with today’s date in filename → `important_2025-09-30.txt`.

const fs=require("fs");

fs.readFile("important.txt","utf-8",(err,data)=>{
    let date1=new Date();
    let y=date1.getFullYear();
    let m=date1.getMonth();
    let d=date1.getDate();
    let final=y+"-"+d+"-"+m;
    // console.log(final);
    fs.writeFile(final+".txt",data,"utf-8",(err)=>{
        if (err){
            console.log(err);
        }
    })
})