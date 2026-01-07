// ### **String Modification**

// **Problem:**

// Write three functions:

// - `addHello(str)` → resolves `"Hello str"` after 1s
// - `addWorld(str)` → resolves `"Hello str World"` after 1s
// - `addExclamation(str)` → resolves `"Hello str World!"` after 1s

// **Task:**

// Use promise chaining to apply all three transformations to `"Student"` and print the final string.

function addHello(str){
    return new Promise((res)=>{
        setTimeout(() => {
            res("Hello "+str)
        }, 1000);
    })
}

function addWorld(str){
    return new Promise((res)=>{
        setTimeout(() => {
            res(str+ " World");
        }, 1000);
    })
}

function addExclamation(str){
    return new Promise((res)=>{
        setTimeout(() => {
            res(str+ "!");
        }, 1000);
    })
}

addHello("Student")
    .then(addWorld)
    .then(addExclamation)
    .then(console.log)
    
