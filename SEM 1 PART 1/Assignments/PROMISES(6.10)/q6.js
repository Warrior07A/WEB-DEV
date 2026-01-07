// ### U**ser Login Simulation**

// **Problem:**

// You have three asynchronous functions:

// - `loginUser()` → resolves `"User logged in"` after 1s
// - `getDashboard()` → resolves `"Dashboard loaded"` after 1s
// - `showWelcomeMessage()` → resolves `"Welcome, user!"` after 1s

// **Task:**

// Use Promises (then Async/Await) to call these in order and print all messages in sequenc

function loginUser(){
    return new Promise((res)=>{
        setTimeout(() => {
        res("User logged in ")
    }, 1000);
    })
}

function getDashboard(){
    return new Promise((res)=>{
        setTimeout(() => {
        res("Dashboard loaded")
    }, 1000);
    })
}

function showWelcomeMessage() {
    return new Promise((res)=>{
        setTimeout(() => {
        res("Welcome User !")
    }, 1000);
    })
}

async function main(){
    const value=await loginUser();
    console.log(value);
    const v2=await getDashboard();
    console.log(v2);
    const v3=await showWelcomeMessage();
    console.log(v3);
}

main();