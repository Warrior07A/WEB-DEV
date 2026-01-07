// Convert array of objects to lookup by id
// Input:
// [{ id: 1, name: "A" }, { id: 2, name: "B" }]

// Output:
// { 1: { id:1, name:"A" }, 2: { id:2, name:"B" } }


let x=[{ id: 1, name: "A" }, { id: 2, name: "B" }];
let obj={};
obj[1]=x[0];
obj[2]=x[1];
console.log(obj);
