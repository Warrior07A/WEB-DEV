// ### 1. Profile Loading Sequence

// **Problem:**

// You have three functions that return promises:

// - `loadUser()` → resolves after 1s with `"User data loaded"`
// - `loadProfile()` → resolves after 1s with `"Profile picture loaded"`
// - `loadPosts()` → resolves after 1s with `"User posts loaded"`

// Run them **sequentially** and print each message in the correct order.

// After all steps, print `"Profile fully loaded"`.

function q1(){
    function loadUser(){
        return new Promise((res)=>{
            setTimeout(()=>{
                res("User data loaded");
            },1000);
        })
    }
    function loadProfile(){
        return new Promise((res)=>{
            setTimeout(()=>{
                res("Profile picture loaded");
            },1000);
        })
    }
    function loadPosts(){
        return new Promise((res)=>{
            setTimeout(()=>{
                res("User posts loaded");
            },1000);
        })
    }    

    loadUser()
        .then((data)=>{
            console.log(data);
            return loadProfile()
        })
        .then((data)=>{
            console.log(data);
            return loadPosts();
        })
        .then((data)=>{
            console.log(data)
        })
        .then(()=>{
            console.log("Profile fully loaded");
        })

}

q1();