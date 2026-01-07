// 1. Sum of element in array
// Question:
// Find the sum of all element in a multi dimension array, if the sum is -ve then it should print 0.
// INPUT: [[1,2,3,4], [5,6,7,8], [10,4,2,1], [1], [-10, 8]]
// OUTPUT: [10, 36, 17, 1, 0]

let x=[[1,2,3,4], [5,6,7,8], [10,4,2,1], [1], [-10, 8]];
let arrf=[];
for (let i=0;i<x.length;i++){
    let sum=0;
    for (let j=0;j<x[i].length;j++){
        sum+=x[i][j];
    }
    if (sum<0){
        arrf.push(0);
    }
    else{
        arrf.push(sum);
    }
    
}

console.log(arrf);
