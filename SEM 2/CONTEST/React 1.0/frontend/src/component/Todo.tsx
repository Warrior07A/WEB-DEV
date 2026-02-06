import { useState } from "react";


interface Itodo{
    title :string,
    desc : string
}
export function Todo(props : Itodo){
    const [todo,setodo] = useState([]);

return <>
<span>
    <span >
        <span style = {{margin : "3px"}}>
            <h2> {props.title}</h2>
            <h2> {props.desc}</h2>
        </span>
    </span>
</span>

</>
    
}

export default Todo;