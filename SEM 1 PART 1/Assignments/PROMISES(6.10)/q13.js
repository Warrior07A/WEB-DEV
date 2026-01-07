// ### **User Bio Loader**

// **Problem:**

// Simulate fetching data from 3 APIs:

// - `getUser()` → `"Yash"`
// - `getAge()` → `"Age: 22"`
// - `getHobby()` → `"Hobby: Coding"`

// Each resolves after 1 second.

// **Task:**

// Show all details in sequence with both methods.


function getUser(){
    return new Promise((res)=>{
        setTimeout(() => {
            res("Yash");
        }, 1000);
    })
}

function getAge(){
    return new Promise((res)=>{
        setTimeout(() => {
            res("Age: 22");
        }, 1000);
    })
}

function getHobby(){
    return new Promise((res)=>{
        setTimeout(() => {
            res("HObby: Coding");
        }, 1000);
    })
}

async function main(){
    let v1=await getUser();
    console.log(v1);
    let v2=await getAge();
    console.log(v2);
    let v3=await getHobby();
    console.log(v3);
}

main();