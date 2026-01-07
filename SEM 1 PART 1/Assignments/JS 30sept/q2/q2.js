// Q2. Word Counter
// Create essay.txt with at least 10 lines of text.
// Read the file and count total words.
// Write the result in a new file essay_summary.txt like:
// Total words: 157

const fs=require("fs");

let contents=fs.readFile("essay.txt","utf-8",(err,data)=>{
    data.toString("utf8")
    data.split('\n');
    let arr=data.split(" ");

    console.log(arr.length)
    fs.writeFile("essay_summary.txt","Total word : "+arr.length,"utf-8",function(err){
    
    })
})

