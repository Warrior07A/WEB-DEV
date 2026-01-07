//given two array
//name array and age array
//create another array with the key value pair of name and age
//example:=>[{name:"JOHn",age:30....}]
const names=["John","Jane","Doe"];
const ages=[30,25 ,40];
let new_Array=[];
let x={};
for(let i=0;i<names.length;i++){
    let j=names[i];
    x[j]=ages[i];

}
new_Array.push(x);
console.log(new_Array);
