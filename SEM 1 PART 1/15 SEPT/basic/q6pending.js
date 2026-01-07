// Group people by city
// Input:
// [
//   { name: "A", city: "Delhi" },
//   { name: "B", city: "Mumbai" },
//   { name: "C", city: "Delhi" }
// ]​
// Output:
// { Delhi: ["A", "C"], Mumbai: ["B"] }


let x=[
  { name: "A", city: "Delhi" },
  { name: "B", city: "Mumbai" },
  { name: "C", city: "Delhi" }
]
let obj={};
let arr1=[];
let arr2=[];
for (let i=0;i<x.length;i++){
    // obj[x[i]["city"]]=arr1;
    if (obj[x[i]["city"]]==x[i]["city"]){
        // arr1.push(x[i].name);
    }
    else{
        obj[x[i]["city"]]=arr1;
        arr1.push(x[i].name);
    }
}
console.log(obj);