// Find most repeated word across categories
// { fruits: ["apple","apple","banana"], drinks: ["apple","tea"] }

//output apple

let fruit=
{ fruits: ["apple","apple","banana"],
     drinks: ["apple","tea"]
     }

let arr1=Object.values(fruit)
let obj1={};
for (let i=0;i<arr1.length;i++){
    for (let j=0;j<arr1[i].length;j++){
        if (obj1[arr1[i][j]]){
            obj1[arr1[i][j]]+=1;
        }
        else{
            obj1[arr1[i][j]]=1;
        }
    // console.log(arr1[i][i]);
    }
}
console.log(obj1);
// console.log(arr1);
let ar2=Object.entries(obj1);
let max=ar2[0][1];
let fruitname=ar2[0][0];
for (let i=0;i<ar2.length;i++){
    
    if (ar2[i][1]>max){
        max=ar2[i][1];
        fruitname=ar2[i][0];
    }
}
console.log(fruitname);