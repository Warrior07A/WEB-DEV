// ### 3. Student Marks Report

// **Problem:**

// Simulate fetching data from three different sources:

// - `getMathMarks()` → resolves with 80
// - `getScienceMarks()` → resolves with 85
// - `getEnglishMarks()` → resolves with 75

// Use async/await to calculate the average and print:

// `"Average marks: 80"`.

function getMathMarks(){
    return new Promise((res)=>{
        res(80);
    })    
}

function getScienceMarks(){
    return new Promise((res)=>{
        res(85);
    })    
}

function getEnglishMarks(){
    return new Promise((res)=>{
        res(75);
    })    
}

async function main(){
    const maths=await getMathMarks()
    const science=await getScienceMarks();
    const english=await getEnglishMarks();
    const avg=(maths + science + english)/3;
    console.log("Average marks: " + avg);

}

main();