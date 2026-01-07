import { useState } from "react";
import { useLocation } from "react-router-dom";

function Dashboard(){
    const location = useLocation();
    const token = location.state?.token;
    const [todolist,settodolist] = useState([]);
    const [todo,setTodo ] = useState("");
    
    const handlechange =(e)=>{
        setTodo(e.target.value);
    }
    async function addtodo(){
        const todos = await fetch("http://localhost:3000/todos",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                token : token
            },
            body:JSON.stringify({
                todo 
            })
        })
        // console.log(todos)
        const user = await todos.json();
        const usertodos = user.todos;
        settodolist(usertodos);
        usertodos.map((i)=>{
            console.log(i);
        })
    }
    

    return(
        <div>
            <input
                type = "text"
                placeholder="Enter your todo here"
                onChange={handlechange}
                className="bg-green-500 border-blue-900"></input>

            <button onClick={addtodo}
                className="bg-pink-800">
                
                Add todo
            </button>
            <div>
                {todolist.length === 0 ?(
                <p>No existing todos</p>
                ):
                (
                    <>
                    <ol>
                    {todolist.map((todo,index)=>(
                        <li key = {index+1}>{index} {todo}</li>
                    )
                    )}
                    </ol>
                </>
                )
                }
            </div>
        </div>
    )
}

export default Dashboard;