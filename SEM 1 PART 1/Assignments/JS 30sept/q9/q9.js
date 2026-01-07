// ### **Q9. Replace Word in File**

// - Create `notes.txt`.
// - Write a program that replaces every word `"bad"` with `"good"` and saves it to `notes_updated.txt`.

const fs=require("fs");

fs.readFile("notes.txt","utf-8",(err,data)=>{
    // data=JSON.parse(data);
    // console.log(data);
    let s="";
    let sp=data.split(" ");
    for (let i=0;i<sp.length;i++){
        if (sp[i]=="bad"){
            s+="good";
            s+=" ";
        }
        else{
            s+=sp[i];
            s+=" ";
        }
        //map use nhi kr skta tha!!!!!
    }
    // console.log(s)

    fs.writeFile("notes_updated.txt",s,"utf-8",(err)=>{
        if (err){
            console.log(err);
        }
    })
})