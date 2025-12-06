import { useState } from "react";
import Dashboard from "./Dashboard";
import settimepromisified from "./promise";
import { useNavigate } from "react-router-dom";
import "./index.css";


function Auth(){ 
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    function Message({msg}){
        return(
            <div>
                <h1>{msg}</h1>
            </div>
        )
    }
    const again =  "   Please sign in again";

    async function signup(){
        if (username.trim() === "" || password.trim() === "" || email.trim()==="")
        {
            setMessage("input box cannot be empty");
            location.reload();
            return;
        }
        const data = await fetch("http://localhost:3000/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username ,
                password,
                email
            })
        })
        const json = await data.json();
        console.log(json);
        setMessage(json + again );
        settimepromisified();
        location.reload();    
    }

    async function signin(){
        const data = await fetch("http://localhost:3000/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                password,
                email
            })
        })
        
        const token = await data.json();
        if (token == "User doesn't exist"){
            setMessage (json.message + JSON.stringify(again) || JSON.stringify(token + again));
            setTimeout(async() => {    
            }, (2000));
            location.reload();
        }
        else{
            setMessage("you are signed in "); 
            navigate("/dashboard",{state :{token}});
        }
    }
    
    return(
        <div className=" h-screen flex-col flex align-center content-center justify-center items-center">
            <div>
                <h1 className="text-blue-600 text-6xl m-10">
                    Authentication Page
                </h1>
            </div>
                <br/>
            <div>
                <input value= {username} 
                className="text-2xl"
                placeholder="Username"
                    type="text" 
                    onChange={(e) =>setUsername(e.target.value)}></input>
            </div>
            <div className="flex content-center">
                <input value= {password}
                placeholder="Password"
                className="text-2xl"
                type="password"
                onChange={(e)=>setPassword(e.target.value)}></input>
            </div>
            <div>
                <input value= {email} 
                placeholder="Email"
                type="email" 
                className="text-2xl"
                onChange={(e) =>setEmail(e.target.value)}></input>
            </div>
        <br/>
        <div className="basis-9">
        <button 
            onClick={signup}> SIGN UP</button>

        <button 
            onClick={signin}> SIGN IN</button>   
        
        </div>
        {message && <Message msg = {message}/>}
    </div>
 )   
}

export default Auth;