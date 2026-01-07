// 2. Find the Second Largest Number
// Question:
// Given an array of numbers, find the second largest element. (assume number inside array will be less than 100)
// INPUT: [10, 25, 8, 99, 67];
// OUTPUT: 67


let x=[10, 25, 8, 99, 67];
let max=0;
let max2=0;
for(let i=0;i<x.length;i++){
    if (x[i]>max){
        max=x[i];
        index=i;
}
}
x.splice(index,1);

for(let i=0;i<x.length;i++){
    if (x[i]>max2){
        max2=x[i];
}
}

console.log(max2);
