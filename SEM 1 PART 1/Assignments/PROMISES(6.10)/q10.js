// ### **File Download Simulation**

// **Problem:**

// Make three asynchronous functions:

// - `startDownload()` → `"Starting download..."`
// - `progress()` → `"50% done..."`
// - `finish()` → `"Download complete!"`

// Each resolves after 1 second.

// **Task:** Print them in order — first with Promises, then with `async/await`.


function startDownload(){
    return new Promise((res)=>{
        setTimeout(() => {
            res("Starting Download...")
        }, 1000);
    })
}

function progress(){
    return new Promise((res)=>{
        setTimeout(() => {
            res("50% done !")
        }, 1000);
    })
}

function finish(){
    return new Promise((res)=>{
        setTimeout(() => {
            res("Download complete !")
        }, 1000);
    })
}

async function main(){
    let v1=await progress();
    console.log(v1);
    let v2=await finish();
    console.log(v2);
}

startDownload()
    .then((data)=>{
        console.log(data)
        main()
    })
    