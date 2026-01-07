console.log("writing a progeam that states the differences betweeen settimeout and setinterval");

let a=setTimeout(() => {
   console.log("this will be executed after 2 secs") 
}, 2000);

let b=setInterval(() => {
    console.log("this will be executed every second");
}, 1000);

