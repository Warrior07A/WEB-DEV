// ### **Q7. JSON Writer**

// - Create an array of students:
    
//     ```jsx
//     [
//       { name: "Ram", age: 20 },
//       { name: "Shyam", age: 22 },
//       { name: "Geeta", age: 21 }
//     ]
//     ```
    
// - Write this array into a file `students.json` using `fs.writeFile`.
// - Then read it back and print all names only.

let obj=[
      { name: "Ram", age: 20 },
      { name: "Shyam", age: 22 },
      { name: "Geeta", age: 21 }
    ]

    const fs=require("fs");
    
obj=JSON.stringify(obj)
// console.log(obj);
    fs.writeFile("students.json",obj,"utf-8",(err,data)=>{
        if (err){
            console.log(err)
        }
    })

    fs.readFile("students.json","utf-8",(err,data)=>{
        let arr=JSON.parse(data);
        for(let i=0;i<arr.length;i++){
            console.log(arr[i].name);
        }
    })