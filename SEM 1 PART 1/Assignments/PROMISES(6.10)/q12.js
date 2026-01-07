// ### **Multiply Chain**

// **Problem:**

// Write a function `multiply(num)` that doubles the number after 1s.

// **Task:**

// Chain multiple calls to show how a number grows step by step.

// Then rewrite with async/await and a simple `for` loop.

function multiply(num){
    return new Promise((res)=>{
        setTimeout(() => {
            res(num*2);
        }, 1000);
    })
}

async function main(){
    let val=await multiply(2);
    console.log(val);
    for (let i=val;i<100;i++){
        let v1=await multiply(i);
        console.log(v1);
    }   
}

main()