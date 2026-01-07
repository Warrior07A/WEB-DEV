// ### **Q6. Count Lines**

// - Create `poem.txt`.
// - Read the file and count how many **lines** it has.
// - Write the result in `poem_summary.txt`

const fs=require("fs");

fs.readFile("poem.txt","utf-8",(err,data)=>{
    // console.log()
    let arr=data.split("\n");
    // console.log(arr.length);
    let num=arr.length
    fs.writeFile("poem_summary.txt","number of lines are "+num,"utf-8",(err)=>{
        if (err){
            console.log(err);
        }
    })
})