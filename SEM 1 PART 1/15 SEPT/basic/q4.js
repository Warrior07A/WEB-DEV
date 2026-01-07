// Find the largest value key
// Input:
// { a: 10, b: 50, c: 20 }

// Output:
// b

let x={ a: 10, b: 50, c: 20 };
let values=Object.values(x);
let keys=Object.keys(x);
let max=0;
let max_v=0;
for (let i=0;i<values.length;i++){
    if (values[i]>max){
        max=values[i];
        max_v=i;
    }
}
console.log(keys[max_v]);