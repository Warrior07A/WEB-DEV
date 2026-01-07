// Convert entries back to object
// Input:
// [["name", "Alice"], ["age", 25]]


// ​
// Output:
// { name: "Alice", age: 25 }

let x=[["name", "Alice"], ["age", 25]];
let obj={};
for (let i=0;i<x.length;i++){
    obj[x[i][0]]=x[i][1];
}
console.log(obj);