// ### **Q3. Remove Extra Spaces**

// - Create a file `messy.txt` with text that has multiple spaces between words.
// - Read the file, clean it so only **one space** exists between words.
// - Write the cleaned text into `cleaned.txt`.
const fs=require("fs");

fs.readFile("messy.txt","utf-8",(err,data)=>{
    let s="";
    for (let i=0;i<data.length;i++){
        if(data[i]==" " && data[i+1]==" "){
            continue;
        }
        else{
            s+=data[i];
        }
    }
        // console.log(s);
        fs.writeFile("cleaned.txt",s,"utf-8",(err)=>{
            if (err){
                console.log(err);
            }
        })
})

