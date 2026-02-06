import { useState } from "react";



interface Itodo {
    todo : string
}
export function TodoList(props : Itodo ){
    let arr = [];
    const [t,settodo] = useState([]);
    settodo(t => arr.push(props.todo));
}

export default TodoList;