// Sum values in object arrays
// Input:
// { food: [10, 20, 30], travel: [5, 15], bills: [40, 60] }


// ​
// Output:
// { food: 60, travel: 20, bills: 100 }

let x=
{ food: [10, 20, 30], travel: [5, 15], bills: [40, 60] }


let fvalue=[];
let value_array=Object.values(x);
for(let i=0;i<value_array.length;i++){
    for(let j=1;j<value_array[i].length;j++){
        value_array[i][0]+=value_array[i][j];
    }
    fvalue.push(value_array[i][0]);
}
let arrl=Object.entries(x);
let keyarray=Object.keys(x);
let obj2={};
for (let i=0;i<arrl.length;i++){
    obj2[keyarray[i]]=fvalue[i];
}

console.log(obj2);