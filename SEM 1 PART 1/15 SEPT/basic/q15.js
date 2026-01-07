// Convert object to query string
// Input:
// { name: "Alice", age: 25 }

// Output:
// "name=Alice&age=25"
let str="";

let x={ name: "Alice", age: 25 };
let keys=Object.keys(x);
let values=Object.values(x);
for (let i=0;i<keys.length;i++){
    str+=keys[i];
    // console.log(str);
    str+="=";
    str+=values[i];
    if (i==0){
        str+="&";
    }
    
}

console.log(str);