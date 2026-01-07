// ### 4. Food Order Flow

// **Problem:**

// You have four functions returning promises:

// - `placeOrder()` → resolves `"Order placed"`
// - `startCooking()` → resolves `"Cooking started"`
// - `packOrder()` → resolves `"Order packed"`
// - `deliverOrder()` → resolves `"Order delivered"`

// Execute them one after another and display each status message in sequence.


function placeOrder(){
    return new Promise((res)=>{
        res("Order placed")
    })
}

function startCooking(){
    return new Promise((res)=>{
        res("Cooking started")
    })
}
function packOrder(){
    return new Promise((res)=>{
        res("Order packed")
    })
}

function deliverOrder(){
    return new Promise((res)=>{
        res("Order delivered")
    })
}

async function main(){
    const m1=await placeOrder();
    const m2=await startCooking();
    const m3=await packOrder();
    const m4=await deliverOrder();
    console.log(m1);
    console.log(m2);
    console.log(m3);
    console.log(m4);
    
}

main();