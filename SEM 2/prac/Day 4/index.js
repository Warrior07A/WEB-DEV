function promisified (timeout){
    return new Promise ((resolve  , reject)=>{
        setTimeout(() => {
            console.log("hi there")
            resolve();  
        }, (timeout));
    })
}

let res = promisified(2000)
    .then(()=>{
        console.log(res);
        console.log("okay ji");
    })