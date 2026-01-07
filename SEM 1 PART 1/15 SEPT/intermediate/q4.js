// Transform API response to object (id → name)
// Input:
// [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" }
// ]


// ​
// Output:
// { 1: "Alice", 2: "Bob"

let x=[
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
]

let obj1={};

for (let i=0;i<x.length;i++){
    obj1[x[i]["id"]]=x[i].name;
}

console.log(obj1);