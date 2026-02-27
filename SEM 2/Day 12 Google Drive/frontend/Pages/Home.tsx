import { useState } from "react";
import "../src/index.css";

export function Home() {
    const [farr , setfarr] = useState([]);
    const [Dialogdisplay , setdisplay] = useState(0);
    let title = "";
    const [fname , setfname] = useState("");

    function FolderDialog(){
        return (
        <div className="flex w-1/4 h-1/4  absolute rounded-2xl text-xl left-150 bg-white-100 border border-zinc-950 ">
                <div>
                    <div className="pt-3 pl-5">
                        <label>New Folder</label>
                    </div>
                    <div className="p-6">
                        <input type="text" autoFocus placeholder="Untitled folder"
                        onChange = {e => title = e.target.value}
                        className = "border w-80 p-3 rounded-md focus:outline-none focus:border-blue-600 transition"/> 
                    </div>
                    <div className="flex pl-10">
                        <button onClick={()=> setdisplay(0)}  className="pl-40 text-blue-600 ">Cancel</button>
                        <button onClick = {CreateFolder} className = "pl-7 text-blue-600" >Create</button>
                    </div>
                </div>
    
            </div>
        )
    }

    function CreateFolder(){
        setfname(title);
        console.log(fname);
        console.log(title);
        if (fname == "") {
            alert("Folder name cannot be empty")
            return;
        }

    }

    function addfile(){

    }
    
    return (
        <>
            <div>
                <div className="h-20 bg-amber-500">
                    NavBar
                </div>
                <div className="flex gap-2 h-screen w-screen" >
                    <div className="w-40 bg-green-700">
                        Sidebar
                    </div>

                    <div className="grow">
                        <div>

                        </div>
                        <div >
                        <div >
                            <button onClick={addfile}className = "border-black p-5 m-10 bg-amber-400 rounded-2xl"> Add File </button>
                            <button onClick={()=>{setdisplay(1)}} className = "border-black p-5 m-10 bg-amber-400 rounded "> Add Folder</button>
                            {Dialogdisplay ? <FolderDialog/> : null}
                        </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}




export default Home
