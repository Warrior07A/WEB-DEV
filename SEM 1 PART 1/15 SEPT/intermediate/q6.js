//  Remove falsy values from object
// Input:
// { a: 0, b: null, c: "hello", d: undefined, e: 5 }


// ​
// Output:
// { c: "hello", e: 5 }


let x={ a: 0, b: null, c: "hello", d: undefined, e: 5 }
let value = Object.values(x);
let key = Object.keys(x)
let obj={};
// console.log("nckwd");
for (let i=0;i<key.length;i++){
    if (value[i]){
        obj[key[i]] = value[i]
    }
}

console.log(obj);