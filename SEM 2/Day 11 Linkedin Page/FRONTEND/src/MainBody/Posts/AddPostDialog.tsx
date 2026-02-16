import { useState } from "react";
import myimage from "../../images/myimage.png"
import { RxCross1 } from "react-icons/rx";
export function AddPostDialog() {
    const [txtcont , setcont] = useState("");
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
            <div style = {{marginTop : "4rem"}}>
                <input 
                    style = {{height : "20rem" ,width : "20rem"}}
                    type = "text" 
                    onChange={e => setcont(e.target.value)}
                    placeholder="What do you want to talk about?" >
                </input>
            </div>
            <div>
            </div>

            <div>
            </div>
        </div>
    )
}

export default AddPostDialog;