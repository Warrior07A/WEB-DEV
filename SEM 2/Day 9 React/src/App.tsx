import { useState } from "react";
import "./index.css"

// function ques1(){
    // export function App(){
    //     const [type , settype] = useState("text");
    //     const [btn , setbtn] = useState("show");
    //     function changebtn(){
    //         if (btn == "show") setbtn (btn => btn = "hide");
    //         else (setbtn(btn =>btn = "show"));
            
    
    //         if (type =="password") settype(type =>type = "text");
    //         else settype(type=> type = "password");
    
    //     }
    //     return <>   
    //         <div>
    //             <input  id = "inputbox" type = {type} placeholder="enter the password"></input>
    //             <button onClick={changebtn}> {btn}</button>
    
    //         </div>
        
    //     </>
    
    // }
    
    // export default App;
// }


// function ques2(){
//      return <>
//     <Card name="Sarah" age={25} isbirthday={true} />
//     <Card name="John" age={30} isbirthday={false} />
//     </>
// }
// interface props{
//     name : string,
//     age : number, 
//     isbirthday : boolean
// }
// function Card(props: props){

//     return <>
//     <div>
//         `Hello {props.name} `
//     </div>
//         <div>
//             {props.isbirthday ?  `🎉 Happy Birthday 🎂" ${props.name}  "! You are now" ${props.age}   "years old!` : `You are " ${props.age} "years old`}
//         </div>
//     </>
// }

// function ques3(){
//     const [like , setlike]  = useState(0);
//     function add(){
//         setlike(like => like+1);
//     }
//     function Unlike(){
//         if (like > 0){
//             setlike(like =>like- 1);
//         }
//     }
//     return <>
//     <div style = {{display: "flex" , alignItems : "center" , height : "100vh" , justifyContent:"center" }}>
//         <button onClick={Unlike}>Unlike</button>
//         <div >
//              {like ?  <button style={{backgroundColor : "red"}}
//              onClick = {add} id = "btn"> {like ?  "Liked 💖" : "Like " }</button>:<button 
//              onClick = {add} id = "btn"> {like ?  "Liked 💖" : "Like " }</button> 
//             }
//             {like} {like <= 1  ? "like" : "likes"} 
//         </div>
//     </div>
//     </>


// }


//heading 2
//ques 1 
// export function App(){
//     let btntype = "allowed";
//     const [cnt , setcnt ] = useState(0);
//     function add(){
//         if (cnt >= 10 ){
//             btntype = "not-allowed"
//             return ;
//         }
//         setcnt(cnt => cnt+1);
//     }
//     function subtract(){
//         if (cnt <= -10){
//             btntype = "not-allowed"
//             return ;
//         }  
//         setcnt (cnt => cnt -1);
//     }
   
//     function reset(){
       
//         setcnt(cnt => cnt = 0)
//     }
//     let color = cnt > 0 ? "green" : cnt < 0 ? "red" : "gray"


//     return <>

//         <div style = {{ display : "flex" , justifyContent : "center" , height : "100vh" , alignItems : "center"}}>
//             <button style = {{ cursor : `${btntype}`}} onClick = {add}> Add</button>
            
//             <div style ={{backgroundColor : `${color}`}}>
//                 count is {cnt}
//             </div>

//             <button onClick= {subtract}> Subtract </button>
//             <div>
//                 <button onClick = {reset}> Reset</button>
//             </div>
    
//         </div>
//     </>
// }

//question 2 
// ### Question 2: User Profile Card

// **Difficulty:** Easy-Medium

// **Concepts:** `props`, conditional rendering

// Create two components:

// 1. `UserProfile` - accepts props: `name`, `age`, `isOnline`, `avatarUrl`
// 2. Display the user information with:
//     - A green dot next to the name if `isOnline` is true, red dot if false
//     - Show "Available" or "Away" text based on online status
//     - If no `avatarUrl` is provided, show a placeholder with the user's initials

// Create a parent component that renders 3 different `UserProfile` components with different data.
interface User{
    name : string,
    age : number,
    isOnline : boolean
    avatarUrl? : string
}
export function App(){

    return <>
    <div>
        <ParentComponent/>
    </div>
    
    </>
}

function UserProfile(props : User){
    return <>
        <div style = {{"display" : "flex" , justifyContent : "flex-start"}}>
            <span> {props.name} </span>
            {
                props.isOnline ? <span>
                        <span style={{margin : "10px" , width : "200px",height : "50px", backgroundColor : "green" , borderRadius: "100%" , border : "2px solid green"
                        }}>

                        </span>
                        
                        <span > Available   </span>
                            {props.avatarUrl!= undefined ?  props.avatarUrl:
                        
                        <span> {props.name[0]}</span>  
                        } 
                    </span>
                    :
                    <span>
                        <span style={{width : "200px"  ,color : "blue" , backgroundColor : "red" , borderRadius: 100 }}>
                          </span>
                        <span style ={{margin : "30px"}}>Away</span>
                        {props.avatarUrl!= undefined ?  props.avatarUrl:
                        <span> {props.name[0]}</span>  
                        } 
                    </span>
                
                
            }
        </div>
    
    </>
}

function ParentComponent(){
    return <>
        <UserProfile name = "aksaht" age = {25} isOnline = {true} avatarUrl = "kjdsbcnkjsdc" />
        <br/> <br/> <br/>   
        <UserProfile name = "gogi" age = {28}   isOnline = {false} />

    
    </>
}

export default App;
