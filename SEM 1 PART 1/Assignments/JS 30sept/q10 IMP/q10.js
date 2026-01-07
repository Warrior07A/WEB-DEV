// ### **Q10. Directory File Reader**

// - Create a folder `logs` with multiple `.txt` files.
// - Read all files inside the folder and combine their contents into one single file `all_logs.txt`.

const fs=require("fs");

const folder='./logs';

let s="";
fs.readdir(folder,(err,files)=>{
    files.forEach(file=>{
        // console.log(file)
        fs.readFile(`logs/${file}`,"utf-8",(err,data)=>{
            s+=data;
            // console.log(s);
            fs.writeFile("all_logs.txt",s,"utf-8",(err)=>{
                if (err){
                    console.log(err);
                }
            })
        })
    })
})
// console.log(s);