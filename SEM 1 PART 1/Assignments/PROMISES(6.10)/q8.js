// ### **Simple Countdown**
// **Problem:**
// Write a function `countdown(num)` that returns a Promise.
// Each second, print the number decreasing until 0, then resolve `"Go!"`.
// **Task:**
// Implement with Promises, then rewrite using `async/await`.
function countdown(num){
    return new Promise((res)=>{
            res(num);
            num--;
    })
}

async function main() {
    let val=await countdown(10);
    // console.log(val);
        while(val>=0){
            console.log(val);
            await new Promise((res)=>{
                setTimeout(()=>{
                    res()
                },1000)
            })
            val--;
        }
}

main()
