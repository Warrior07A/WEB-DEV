//why is thiss called settimeout based promisified ??

const { time } = require("console");

//

//
function setpromisified(timeout){              //RETURNs you a promise of a class
    return new Promise((res)=>{
        setTimeout(res,timeout)
    })
}

setpromisified(5000)
    .then(()=>{
        console.log("hi there");
        return(setpromisified(2000))
    })
    .then(()=>{
        console.log("hey");
        return(setpromisified(5000))
    })
    .then(()=>{
        console.log("hello");
    })

    