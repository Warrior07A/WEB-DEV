// Unique values across all object arrays
// Input:
// { x: [1,2,3], y: [2,3,4], z: [4,5] }


// ​
// Output:
// [1,2,3,4,5]


let x={ x: [1,2,3], y: [2,3,4], z: [4,5] };
let values=Object.values(x);
console.log(values);
let arr=[];
arr.push(values[0]);
for (let i=0;i<values.length;i++){
    for (let j=1;j<values[i].length;j++){
        for (let i=0;i<arr.length;i++){
            if(values[i][j]==arr[i]){
                continue;
            }
            else{
                arr.push(values[i][j]);
            }
        }
    }
}