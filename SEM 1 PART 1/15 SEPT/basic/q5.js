// Flatten object of arrays into one array
// Input:
// { fruits: ["apple", "banana"], veggies: ["carrot", "pea"] }


// ​
// Output:
// ["apple", "banana", "carrot", "pea"]
let x={ fruits: ["apple", "banana"], veggies: ["carrot", "pea"] };

let values=Object.values(x);
let fa=[];
for (let i=0;i<values.length;i++){
    for (let j=0;j<values[i].length;j++){
        fa.push(values[i][j]);
    }
    
}
console.log(fa);