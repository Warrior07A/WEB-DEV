// ### **Conditional Check**

// **Problem:**

// Write a function `checkEven(num)` that returns a promise.

// - If the number is even → resolve `"Even number"`.
// - If the number is odd → resolve `"Odd number"`.

// **Task:**

// Test the function with chaining and handle both resolve and reject using `.then()` and `.catch()`.

function checkEven(num){
    return new Promise((res,rej)=>{
        if(num%2==0){
            res("Even number");
        }
        else{
            rej("Odd number");
        }
        // rej();
    })
}

checkEven(3)
    .then((e)=>{
        console.log(e)
    })
    .catch((e)=>{
        console.log(e);
    })