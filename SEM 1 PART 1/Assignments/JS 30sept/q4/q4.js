// ### **Q4. Reverse Content**

// - Create `data.txt` with some text.
// - Read the file and reverse the text (last character becomes first, etc.).
// - Save the reversed content in `reversed.txt`.

const fs=require("fs");

fs.readFile("data.txt","utf-8",(err,data)=>{
    let s="";
    let sp="";
        let arr=data.split(" ");
        // console.log(arr);
        for (let i=arr.length;i>=0;i--){
            sp+=arr[i];
            sp+=" ";
        }
        fs.writeFile("reversed.txt",sp,"utf-8",(err)=>{
            if (err){
                console.log(err);
            }
        })
})