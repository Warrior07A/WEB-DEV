// const axios = require("axios")

const tododiv = document.getElementById("tododiv");
const inputbox = document.getElementById("inputbox");
const addbtn = document.getElementById("addbtn");


async function main(){

   const response = await fetch("http://localhost:3000/todos")
   const json = await (response.json()); 
   console.log(json);
   json.forEach((item)=>{
       item.task;
    
       const li = document.createElement("li");
       const button1 = document.createElement("button");
       const button2 = document.createElement("button");
       const newdiv = document.createElement("div");
       button1.innerText = "completed";
       button2.innerText = "Delete";
       li.innerHTML += item.task
       if (item.completed) {
        li.innerHTML +="✅"
        }
        newdiv.append(li);
        newdiv.append(button1);
        newdiv.append(button2);
        tododiv.appendChild(newdiv);
        console.log(item.id);
        button1.addEventListener("click",async ()=>{
            const res = await fetch("http://localhost:3000/todos/"+item.id,{
                method:"PUT",
                body:JSON.stringify({completed:true}),  
                headers: {'Content-Type' : 'application/json'},
            })
            const ans = await res.json()
            console.log(ans)
            main();
        })

        button2.addEventListener("click",async()=>{
            fetch()
        })
        
    })
}

addbtn.addEventListener("click",()=>{
    const newtodo  = inputbox.value;
    fetch("http://localhost:3000/todos",{
        method:"POST",
        headers: {'Content-Type' : 'application/json'},
        body:JSON.stringify({task : newtodo})
    })
    main();
})


main();