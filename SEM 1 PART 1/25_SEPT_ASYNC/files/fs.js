const fs=require("fs");

const contents=fs.readFileSync("file1.txt","utf-8");

console.log(contents);
let s="";
for  (let i=0;i<contents.length;i++){
    if(contents[i]==" " && contents[i+1]==" "){
        continue;
    }
    else{
        s+=contents[i];
    }

}

console.log(s);

