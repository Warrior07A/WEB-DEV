// ### 4. **Find Pairs with Given Sum**

// **Question:**

// Find all pairs of numbers that sum up to a target.
// INPUT: [2, 7, 4, 5, 1, 3]; target = 6;

// OUTPUT: [ [2, 4], [5, 1] ]
let x=[2, 7, 4, 5, 1, 3]; 
let target = 6;

let arro=[];
for(let i=0;i<x.length;i++){
    let arri=[];
    for(let j=i+1;j<x.length;j++){
        if (x[i]+x[j]==target){
            arri.push(x[i]);
            arri.push(x[j]);
            arro.push(arri);
        }
    }
}
console.log(arro)