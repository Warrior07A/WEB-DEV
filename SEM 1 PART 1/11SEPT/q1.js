const array=["apple","banana","apple","apple","orange"];


//ouput
// {
//     apple:3,
//     banana:1,
//     orange:1
// }

let x2={};
for (let i=0;i<array.length;i++){
    let n=0;
    let x=array[i];
    if (x2[x]){
        x2[x]+=1;
    }
    else{
        x2[x]=1;
    }
}

console.log(x2);
