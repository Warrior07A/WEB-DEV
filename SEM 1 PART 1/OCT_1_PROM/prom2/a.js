//write a fn that takes all

function setpromisified((ms)=>{
    return new Promise((res)=>{
        setTimeout(res() => {
            res
        }, ms);
    })
})

