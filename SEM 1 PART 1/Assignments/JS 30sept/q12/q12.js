// ### **Q12. Find Longest Word**

// - Read `story.txt`.
// - Find the **longest word**.
// - Save result into `longest.txt`:

const fs = require("fs");
fs.readFile("story.txt", "utf-8", (err, data) => {
    let arr = data.split(" ");
    let max = 0;
    let word="";
    console.log(arr);
    for(let i=0;i<arr.length;i++){
        if(arr[i].length>max){
            max=arr[i].length
            word=arr[i];
        }
    }
    fs.writeFile("longest.txt",word,(err)=>{
        if (err){
            console.log(err)
        }
    })
})