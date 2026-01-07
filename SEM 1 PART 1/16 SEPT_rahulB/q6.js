// 6. Find student with highest average mark
// Question:
// Find all the common element present in all array and print them inside array
// INPUT: { A: [80, 90], B: [70, 75, 85] }
        
// Output: A

let x={ A: [80, 90], B: [70, 75, 85] }
let keys=Object.keys(x);
let values=Object.values(x);

let arr4=[];

for (let i=0;i<values.length;i++){
    let len=values[i].length;
    let sum=0;
    let avg;
    for (let j=0;j<len;j++){
        sum+=values[i][j];
    }
    avg=sum/len;
    arr4.push(avg);
}
// console.log(arr4);
let max=0;
let index=0;
for (let i=0;i<arr4.length;i++){
    if(arr4[i]>max){
        max=arr4[i];
        index=i;
        // console.log(index);
    }
}
// console.log(max);
console.log(keys[index]);