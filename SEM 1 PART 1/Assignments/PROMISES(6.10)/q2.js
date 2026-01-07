// ### **Math Operations**

// **Problem:**

// Write a function `multiplyBy2(num)` that returns a promise resolving after 1 second with `num * 2`.

// **Task:**

// Chain multiple calls to multiply a number 5 → 10 → 20 → 40 → print final result.

function multiplyBy2(num){
    return new Promise((res)=>{
        setTimeout(() => {
            res(num);
        }, 1000);
    })
}

multiplyBy2(5)
    .then((data)=>{
        console.log(data)
        return data*2;
    })
    .then((data)=>{
        console.log(data)
        return data*2
    })
    .then((data)=>{
        console.log(data)
        return data*2;
    })
    .then((data)=>{
        console.log(data)
    })
