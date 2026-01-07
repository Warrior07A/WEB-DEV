// Q11. Split Words
// Read sentence.txt.
// Split text into words and save one word per line in words.txt.
// Example:
// Input → "I love coding"
// Output →
// I
// love
// coding

const fs=require("fs");
let s="";
fs.readFile("sentence.txt","utf-8",(err,data)=>{
    let arr=data.split(" ");
    // console.log(arr);
    for (let i=0;i<arr.length;i++){
        s+=arr[i];
        s+='\n';
    }
    fs.writeFile("words.txt",s,(err)=>{
        if (err){
            console.log(err);
        }
    })
})