//     Pick only given keys from object
// Input:
// { name: "Rahul", age: 23, city: "Noida" }, ["name","city"]
// ​
// Output:
// { name: "Rahul", city: "Noida" }

let x={ name: "Rahul", age: 23, city: "Noida" };
let q=["name","city"];
let keys=Object.keys(x);
let values=Object.values(x);
let obj2={};

let ql=q.length;
for(let i=0;i<ql;i++){
    obj2[q[i]]=x[q[i]];
}
console.log(obj2);
