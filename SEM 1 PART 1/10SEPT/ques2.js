
let a=[1,2,3,[4,5,6,[7,8],100],12,13,14,[12,[66,77,88],12,12]];
let n=a.length;
let finalarr=[];

function find(arr){
    let n1=arr.length;
    for (let i=0;i<n1;i++){
        if (typeof(arr[i])=="object"){
            find(arr[i]);
        }
        else{
            finalarr.push(arr[i])
        }
    }
}

for (let i=0;i<n;i++){
    if (typeof(a[i])=="object"){
        find(a[i]);
    }
    else{
        finalarr.push(a[i]);
    }
}

console.log(finalarr);