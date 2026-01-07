const array=[1,2,3,4,5,6,7,8,9,10];
//to do
//remove all oddd numbers
//double whatever is pending
const arr2=array.filter((n)=>{
    if (n%2!=0){
        return false
    }
    else{
        return true;
    }
})

.map((n)=>{
        return n*2;
})
console.table(arr2);
