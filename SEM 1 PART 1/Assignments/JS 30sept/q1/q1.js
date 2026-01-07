// ### **Q1. Uppercase Writer**

// - Create a file `story.txt` with some text of your choice.
// - Write a program that reads the content and writes the **uppercase version** into a new file `story_upper.txt`.

const fs=require("fs");

const contents=fs.readFile("story.txt","utf-8",(err,data)=>{
    fs.writeFile("story.txt",data.toUpperCase(),"utf-8",(err)=>{
        if (err){
            console.log(err);
        }
    })
})