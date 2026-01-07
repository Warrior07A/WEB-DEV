// ### **Q13. Find Shortest Word**

// - Read `story.txt`.
// - Find the **shortest word**.
// - Save result into `shortest.txt`.

const fs = require("fs");
fs.readFile("story.txt", "utf-8", (err, data) => {
    let arr = data.split(" ");
    let min = 10000000000;
    let word="";
    // console.log(arr);
    for(let i=0;i<arr.length;i++){
        if(arr[i].length<min){
            min=arr[i].length
            word=arr[i];
        }
    }
    fs.writeFile("shortest.txt",word,(err)=>{
        if (err){
            console.log(err)
        }
    })
})