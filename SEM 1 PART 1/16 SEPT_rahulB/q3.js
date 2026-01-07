// 3. Rotate Array by K Steps
// Question:
// Rotate the array to the right by k positions.
// INPUT: [1, 2, 3, 4, 5]; k = 2;

// OUTPUT: [4, 5, 1, 2, 3]

let x=[1, 2, 3, 4, 5]; 
let k=2;
let arr2=[];
let l=x.length;
for (let i=0;i<k;i++){
    arr2[i]=x[l-i-1];
}
let arr3=arr2.reverse();
for (let i=0;i<l-k;i++){
    arr3.push(x[i]);
}
console.log(arr3);