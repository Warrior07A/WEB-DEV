// ### **Fetch Product and Price (Simulated Data)**

// **Problem:**

// Create two functions:

// - `getProduct()` → resolves with `"Laptop"` after 1s
// - `getPrice(product)` → resolves with `"Price of Laptop is ₹50000"` after 1s

// **Task:**

// Call them sequentially and log both results.


function getProduct(){
    return new Promise((res)=>{
        setTimeout(()=>{
            res("Laptop");
        },1000)
    })
}

function getPrice(product){
    return new Promise((res)=>{
        setTimeout(() => {
            res("Price of " + product +"is Rs 5000")
        }, 1000);
    })
}

async function main(){
    const v1=await getProduct();
    console.log(v1);
    const v2=await getPrice(v1);
    console.log(v2);
}

main();