// ### **Random Joke Generator**

// **Problem:**

// Simulate API calls:

// - `getSetup()` → resolves `"Why did the developer go broke?"` after 1s
// - `getPunchline()` → resolves `"Because he used up all his cache!"` after 1s

// **Task:**

// Show both lines in correct order.

function getSetup(){
    return new Promise((res)=>{
        setTimeout(() => {
            res("Why did the developer go broke?")
        }, 1000);
    })
}

function getPunchline(){
    return new Promise((res)=>{
        setTimeout(() => {
            res("Because he used up all his cache!")
        }, 1000);
    })
}

async function main(){
    let v1=await getSetup();
    console.log(v1);
    let v2=await getPunchline();
    console.log(v2);
}

main()