//ways to add an object and change it
//use arr1 and print somrthing like

// 

let arr1=[1,2,3,4,5];
let arr2=[20,30,40,50];
let ans=[];
for(let i=0;i<arr1.length;i++){
    ans.push(arr1[i]);
}
for(let i=0;i<arr2.length;i++){
    ans.push(arr2[i]);
}

console.log(ans);


let x={};
for (let i=1;i<=arr1.length;i++){
    x["value"+i]=arr1[i];
}

console.log(x);