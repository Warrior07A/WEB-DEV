// 3. **Swap keys and values of object**
//     - Input:
        
   
//         { a: "x", b: "y", c: "z" }
        

        
//     - Output:
        
//      { x: "a", y: "b", z: "c" }

     
let x={ a: "x", b: "y", c: "z" };

let entries=Object.entries(x);
// console.log(entries);
let obj={};
for (let i=0;i<entries.length;i++){
    obj[entries[i][1]]=entries[i][0];
}
 console.log(obj);
