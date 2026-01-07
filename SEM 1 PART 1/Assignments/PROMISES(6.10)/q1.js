// ### **Sequential Steps**

// **Problem:**

// You have three functions: `step1()`, `step2()`, `step3()`. Each returns a promise that resolves after 1 second with a message `"Step X done"`.

// **Task:**

// Use **promise chaining** to print all steps in order and then `"All steps completed"`.

function step1(){
    return new Promise((res)=>{
        setTimeout(() => {
            res("promise 1 completed")
        }, 1000);
    })
}
function step2(){
    return new Promise((res)=>{
        setTimeout(() => {
            res("promise 2 completed")
        }, 1000);
    })
}
function step3(){
    return new Promise((res)=>{
        setTimeout(() => {
            res("promise 3 completed")
        }, 1000);
    })
}


step1()
    .then((d)=>{
        console.log(d);
        step2()
            .then((d1)=>{
                console.log(d1);
                step3()
                .then((d2)=>{
                    console.log(d2)
                        console.log("All are done");  
                })
            })
    })