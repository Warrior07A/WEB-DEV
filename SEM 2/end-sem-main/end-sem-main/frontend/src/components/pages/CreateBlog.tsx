import { apiClient } from "@/lib/axios-instance";
import { useState } from "react";

interface Blog{
    title : string,
    content : string
}

export default function CreateBlog(){
    const [t , sett]  = useState("");
    const [con , setcont] = useState("");
    const [loading ,setload] = useState(0);


    function Loader(){
        return(
            <div className="fixed w-50vw h-50vh">
                Loading..... Please wait
            </div>
        )
    }

    async function createblog(){
        setload(1);
        const response = await apiClient.post<Blog>("/blogs/create", {
            title : t,
            content : con
        });
        if (response.status == 201){
            alert("your blog has been created");
        }
        setload(0);
        console.log(response);
    }


    return(
        <div>
            {loading ? <Loader/> :  
            <>
             <div className="h-40 w-screen bg-red-500"> 
                Create Blog
            </div>

            <div className="h-30 w-40">
                <input 
                onChange={(e)=>{sett(e.target.value)}}
                className="h-30 w-40  border border-zinc-400"
                type = "text" placeholder="Enter yor title"></input>
            </div>

            <div className="h-100 w-screen">
                <input 
                onChange={(e)=>{setcont(e.target.value)}}
                className="h-100  w-screen border border-amber-400" 
                type = "text" placeholder="Enter the content"></input>
            </div>
            <button className="w-30 h-10 bg-amber-200 rounded" 
            onClick={()=>{createblog()}}> 
                Post Me

            </button>
            </>
            }

        </div>



    )
}