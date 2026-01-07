// Filter object by values > 50
// Input:
// { a: 20, b: 60, c: 40, d: 90 }


// ​
// Output:
// { b: 60, d: 90 }

let x={ a: 20, b: 60, c: 40, d: 90 };
let values=Object.values(x);
let keys=Object.keys(x);
let obj={};

for (let i=0;i<values.length;i++){
    if (values[i]>50){
        obj[keys[i]]=values[i];
    }
}
console.log(obj);