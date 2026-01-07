// ### **Weather Data Flow**

// **Problem:**

// Simulate getting weather data:

// - `getCity()` → resolves `"Delhi"` after 1s
// - `getWeather(city)` → resolves `"Weather in Delhi is 32°C"` after 1s

// **Task:**

// Use both Promises and async/await to display data step by step.

function getCity(){
    return new Promise((res)=>{
        setTimeout(() => {
            res("Delhi")
        }, 1000);
    })
}

function getWeather(){
    return new Promise((res)=>{
        setTimeout(() => {
            res("Weather in Delhi is 32°C")
        }, 1000);
    })
}

async function main(){
    let v1=await getCity();
    console.log(v1);
    let v2=await getWeather();
    console.log(v2);
}

main()