// #Assignment 2


let a1=[
    {name:"John",scores:[30,40,20]},
    {name:"Mira",scores:[40,30,45]},
    {name:"Shreya",scores:[50,50,50]},
    {name:"Taylor",scores:[10,5,25]}
]
//find the objecy whose scores are greter than 100
let a2=a1.filter((i)=>{
    if ( (i.scores[0]+i.scores[1]+i.scores[2])>100 ) {
        return true;
    }
    else{
        return false;
        
    }
})
console.log(a2)


// let a3=[1,2,3,4,5,6,7,8,9,10];
// a3.filter((i)=>{
//     i.
// })