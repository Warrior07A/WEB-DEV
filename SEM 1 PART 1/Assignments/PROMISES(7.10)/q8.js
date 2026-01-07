// ### 8. Async Loop Execution
// **Problem:**
// Write a function that prints numbers `1 to 5` with a 1-second delay between each print.
// Hint: Use a loop with `await new Promise(resolve => setTimeout(resolve, 1000))`.
// ---
// ###


function delay(num){
    return new Promise((res)=>{
        setTimeout(()=>{
            res(num);
        },1000)
    })
}

async function main(){
    for(let i=1;i<=5;i++){
        const number=await delay(i);
        console.log(number);
        
    }
}
main()