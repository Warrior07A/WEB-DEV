let arr=[];
const button=document.getElementById("button");
let number=1;
button.addEventListener('click',()=>{
    
    const inputbox=document.getElementById("inputbox");
    const value=inputbox.value;
    const d1=document.getElementById("d1")
    
    const div=document.createElement("div");
    const div1=document.createElement("div");
    const button=document.createElement("button");
    button.textContent="delete";
    div1.innerHTML=value;
    

    // div.append(h1);
    d1.appendChild(div1);
    
    arr.push(value);
    localStorage.setItem("todo", JSON.stringify(arr));
})



window.onload=function(){
  let val=  localStorage.getItem("todo");    
    const d1=document.getElementById("d1")
    const div=document.createElement("div");
    div.append(val)
    d1.appendChild(div)
}