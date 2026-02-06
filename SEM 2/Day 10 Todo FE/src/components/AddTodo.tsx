import { useState } from "react";
import TodoList from "./TodoList";


export function AddTodo(){
    let text = "" ;
    function enterissend(e){
        if (e.key == 'Enter'){
            if (e.target.value == "") {
                alert("enter some input")
                return ;
            }
            text = e.target.value;
            <TodoList todo = {text}/>
            e.target.value = "";
        }
    }
    return <>
    <div style ={{margin : "40px",height : "10vh" , width : "100vw" , display : "flex" , justifyContent : "center" ,font : "30px"}}>
        <div>
            <h1>Let's Move ! </h1>
        </div>
    </div>

    <div style ={{ margin : "40px" , height : "10vh" , width : "100vw" , display : "flex" , justifyContent : "center" ,font : "30px"}}>
        <div>
            <input style ={{ height : "5vh" , width : "50vh"}} 
            type = "text" placeholder="Add Todos"  onKeyDown={enterissend}/>    
        </div>
    </div>    
    
    </>
}


export default AddTodo