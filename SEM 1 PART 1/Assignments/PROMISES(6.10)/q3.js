// ### **Greeting**

// **Problem:**

// Write a function `getName()` that returns a promise resolving with your name after 1 second.

// **Task:**

// Chain another `.then()` to greet the user: `"Hello, <name>!"`.

function getName(){
    return new Promise((res)=>{
        setTimeout(()=>{
            res("Hello");
        },1000)
    })
}

getName()
    .then((data)=>{
        console.log(data+" Akshat");
    })