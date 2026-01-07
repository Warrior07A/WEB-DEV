// Check if all values in object are numbers
// Input:
// { a: 1, b: "hello", c: 3 }


// ​
// Output:
// false

let x={ a: 1, b: "hello", c: 3 };
let values=Object.values(x);
for (let i=0;i<values.length;i++){
    if(typeof(values[i])==Number){
        found=true;
    }
    else{
        found=false;
    }
}
if (found==true){
    console.log("true");
}
else{
    console.log("false");
}