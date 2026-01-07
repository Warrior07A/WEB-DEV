// Q14. Count Vowels
// Read data.txt.
// Count total vowels (a, e, i, o, u).
// Save into vowels.txt:
// Total vowels: 47

const fs=require("fs");
let vow=["a","e","i","o","u"];
fs.readFile("data.txt","utf-8",(err,data)=>{
    // console.log(data);
    let cnt=0;
    for (let i=0;i<data.length;i++){
        if (data[i]=='a' || data[i]=='e' || data[i]=='i' || data[i]=='o' || data[i]=='u'){
            cnt++;
        }
    }
    fs.writeFile("vowels.txt", "vowels are : " +cnt,(err)=>{
        if (err){
            console.log(err);
        }
    })
})