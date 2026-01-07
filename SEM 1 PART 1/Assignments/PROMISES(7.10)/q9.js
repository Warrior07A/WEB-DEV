// ### 9. Retry on Failure

// **Problem:**

// Write a function `unstableTask()` that randomly either resolves `"Success"` or rejects `"Failed"`.

// Use async/await to retry the task up to 3 times until it succeeds.

// If it still fails after 3 tries, print `"All retries failed"`.


function unstableTask(){
    return new Promise((res)=>{
        let no=Math.round(Math.random());
        if (no == 1){
            res("Success");
        }
        else{
            res("Failed");
        }
    })
}


async function main(){
    let found=false;
    for(let i=0;i<3;i++){
        const retry=await unstableTask();
        if (retry == "Success"){
            console.log(retry);
            found=true;
            break;
        }
        console.log("Tried");
    }
    if (!found){
        console.log("All retries failed");
    }
}

main();