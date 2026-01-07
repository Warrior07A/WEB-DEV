// ### **Q5. Merge Files**

// - You have 2 files: `a.txt` and `b.txt`.
// - Read both files and merge their contents into a new file `ab.txt`.

const  fs=require("fs");
let p="";
fs.readFile("a.txt","utf-8",(err,data)=>{
    p=data;
    let p2="";
    fs.readFile("b.txt","utf-8",(err2,data2)=>{
        p2=data2;
        let pf=p+p2;
        // console.log(pf);
        fs.writeFile("ab.txt",pf,"utf-8",(err)=>{
            if (err){
                console.log(err);
            }
        })
    })
})