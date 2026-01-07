// Count even and odd numbers in array
// Input:
// [1,2,3,4,5,6]

// Output:
// { even: 3, odd: 3 }
let even=0;
let odd=0;
let x=[1,2,3,4,5,6]
let no=x.map((i) =>{
    if (i%2==0){
        even+=1;
    }
    else{
        odd+=1;
    }
})

let obj={};
obj["even"]=even;
obj["odd"]=odd;
console.log(obj);
