// Find student with highest average marks
// Input:
// { A: [80, 90], B: [70, 75, 85] }


// ​
// Output:
// A

let x={ A: [80, 90], B: [70, 75, 85] };
let values=Object.values(x);
let keys=Object.keys(x);
// console.log(values);
let max=0;

for (let i=0;i<values.length;i++){
    
    let sum=0;
    for (let j=0;j<values[i].length;j++){
        sum+=values[i][j];
    }
    let avg=sum/(values[i].length);
    if (avg>max){
        max=avg;
        index=i;
    }
}
console.log(keys[index]);