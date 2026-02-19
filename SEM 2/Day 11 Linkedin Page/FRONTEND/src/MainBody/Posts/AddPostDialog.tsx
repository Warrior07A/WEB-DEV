import { useState } from "react";
import myimage from "../../images/myimage.png"
import { RxCross1 } from "react-icons/rx";

import axios from "axios";
import { useNavigate } from "react-router-dom";
const SECRET = "akshat";
export function AddPostDialog() {
    const [txtcont , setcont] = useState("");
    const navigate  = useNavigate();
    async function SendPost(){
        let token = localStorage.getItem("authorization");
        if (token){
            token = token.slice(7);
            console.log(token);
            const response = await axios.post("http://localhost:3001/posts" , {
                CreatedAt : "hi there",
                content  : txtcont,
                // contentimg : postver,
                // contentvdo : postver.data.contentvdo
                headers:{
                    'Content-Type'  :'application/json',
                    'authorization' : token
                }
            })
            if (response.status == 201){
                navigate(0);
                console.log("go");
            }
        }else{
            console.log("no token found");
        }
        
    }
    
    return (
        <div
            style={{
                backgroundColor: "white", position: "fixed", zIndex: 9999, top: "2.1rem", width: "46rem", left: "50%", border : "1px solid black",
                transform: "translateX(-50%)", "height": "35rem", padding: "2rem"
            }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style = {{display : "flex", width : "20rem"}}>
                <div >
                    <img 
                        style = {{ width : "3rem" , height : "3rem" , borderRadius : "50%"}}
                        src={myimage}
                        />
                </div>
                <div>
                    <div>
                        <label> Akshat Mittal</label>
                    </div>
                    <div>
                    <label> Post to Anyone </label>
                    </div>
                </div>
                </div>

                <div>
                    <RxCross1 size = {20} />
                </div>
            </div>
            <div style = {{marginTop : "3.5rem" , width : "100%"}} >
                <input 
                    style = {{justifyContent : "flex-start"   ,height : "20rem" ,width : "100%", paddingBottom : "5rem" , display : "flex" , textAlign : "center"}}
                    type = "text" 
                    onChange={e => setcont(e.target.value)}
                    placeholder="What do you want to talk about?" >
                </input>
            </div>
            <br/>
            <div style = {{display : "flex" , justifyContent : "flex-end"}}>
                <button onClick = {SendPost} style = {{borderRadius : "3rem" , padding : ".5rem" , width : "4rem" , backgroundColor : "#E8E8E8", color : "#A2A2A2" , border : "none" }}> Post</button>
            </div>

            <div>
            </div>
        </div>
    )
}

