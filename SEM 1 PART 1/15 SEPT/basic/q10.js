// Pick only given keys from object
// Input:
// { name: "Rahul", age: 23, city: "Noida" }, ["name","city"]


// ​
// Output:
// { name: "Rahul", city: "Noida" }

let x={ name: "Rahul", age: 23, city: "Noida" };
let y= ["name","city"];
let obj={};
obj["name"]=x["name"];
obj["city"]=x["city"];
console.log(obj);