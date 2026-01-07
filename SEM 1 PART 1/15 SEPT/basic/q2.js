// Count word occurrences in array
// Input:
// ["apple", "banana", "apple", "orange", "banana", "apple"]


// ​
// Output:
// { apple: 3, banana: 2, orange: 1 }

let x=["apple", "banana", "apple", "orange", "banana", "apple"];
let obj={};
for (let i=0;i<x.length;i++){
    if (obj[x[i]]){
        obj[x[i]]+=1;
    }
    else{
        obj[x[i]]=1;
    }
}

console.log(obj);