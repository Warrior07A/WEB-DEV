// ### 5. Sequential Letter Printing

// **Problem:**

// Write a function `printLetter(letter)` that returns a promise which resolves after 1 second with that letter.

// Use async/await to print the letters `"A"`, `"B"`, `"C"`, `"D"` one after another, each one second apart.

function printLetter(letter){
    return new Promise((res)=>{
        setTimeout(() => {
            res(letter);
        }, 1000);
    })
}

async function main(){
    const l1=await printLetter('A');
    console.log(l1);
    const l2=await printLetter('B');
    console.log(l2);
    const l3=await printLetter('C');
    console.log(l3);
    const l4=await printLetter('D');
    console.log(l4);

}

main();
