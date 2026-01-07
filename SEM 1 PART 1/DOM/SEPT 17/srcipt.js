const userinput=document.getElementById("userinput");
const addBtn=document.getElementById("button");
const todolist=document.getElementById("todolist");

addBtn.addEventListener('click',(userinput)=>{
    const todo=userinput.value;
    console.log(todo);
    

    const li=document.createElement("li");
    li.textContent=todo;
    const delbtn=document.createElement("button");
    delbtn.innerText="delete";

    delbtn.addEventListener("click" , function delbtnclick(){
        li.remove();
    });
    
    li.appendChild(delbtn);
    todolist.appendChild(li);
    input.value = "";
})