import axios from "axios";
import Todo from "./component/Todo"
import { useState } from "react";

interface arrI {
    title: string,
    description: string
}
let arr: arrI[] = [];
let title : string = "";
let desc : string =  "";
export function App() {
    let [array, setarr] = useState([]);

    function changetitle(e : React.ChangeEvent<HTMLInputElement> ){
        title = e.target.value;
    }
    function changedesc(e : React.ChangeEvent<HTMLInputElement>){
        desc = e.target.value;
    }
    async function addTodo() {

        if (title == "" || desc == ""){
            alert("INPUT cannot be empty")
            return;
        }
        try {
            const resp = await axios.post("http://localhost:3001/add",
                {
                    "title": title,
                    "desc": desc
                })
            const resp2 = await axios.get("http://localhost:3001/todo")
            arr = resp2.data.todo;
            setarr(array => array = arr);
                   
        } catch (e) {
            console.log("invalid data");
        }
    }

    async function getTodo() {
        try {
            const resp = await axios.get("http://localhost:3001/todo")
            console.log(resp);
            arr = resp.data.todo;
            console.log(arr);

            setarr(array => array = arr);
        } catch (e) {
            console.log("invalid data");
        }
    }
    return (
        <div >
            <div style={{ display: "flex" }}>
                <span style={{ margin: "30px" }}>
                    <h1 > title</h1>
                </span>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <input id="inp1" onChange={changetitle} type="text" placeholder="enter todo here"></input>
                </span>
            </div>

            <div style={{display : "flex"}}>
                <span style ={{margin : "30px"}}>
                    <h1> Description</h1>
                </span>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <input type="text" id="inp2" onChange={changedesc} placeholder="enter description here"></input>
                </span>
            </div>
            <div >
                <button style = {{margin : "40"}} onClick={addTodo}> Add </button>

                <button style = {{margin : "40", padding : "20"}} onClick={getTodo} > Show </button>
            </div>
            <div style = {{display : "flex", flexWrap : "wrap" }}>
                {arr.map((item, index) => (
                    <div style = {{paddingRight: "30px", paddingLeft: "30px" , border : "5px solid black" , padding : "20px"}}>
                        <Todo key={index} title={item.title} desc={item.description} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App;
