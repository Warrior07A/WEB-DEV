// ### 2. Sequential Arithmetic

// **Problem:**

// Create a function `addNumber(num, addValue)` that returns a promise resolving with `num + addValue` after 1 second.

// Using promise chaining or async/await, perform these steps:

// Start with 5 → add 3 → add 7 → add 10 → print the total result.

function addNumber(num,addValue){
    return new Promise((res)=>{
        setTimeout(() => {
            res(num+addValue);
        }, 1000);
    })
}

addNumber(5,3)
    .then((data)=>{
        console.log(data);
        return addNumber(data,3); 
    })
    .then((data)=>{
        console.log(data);
        return addNumber(data,7)
    })
    .then((data)=>{
        console.log(data)
        return addNumber(data,10);
    })
    .then((data)=>{
        console.log(data);
    })


