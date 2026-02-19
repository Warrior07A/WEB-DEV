import { useEffect, useState } from "react";
import {Post, type Ipost } from "./Post.tsx"
import axios from "axios";

interface IFeed{
    id: number,
    user_id: number,
    CreatedAt: string,
    content:  string,
    contentimg:  string,
    contentvdo?:  string,
    owner: { id: number,
        name: string,
        email:  string,
        password:  string,
        secretrole:  string,
        subheading? :  string,
        phone? :  string,
        coverpic? : string,
        ppic?  :string,
        Location? :  string,
        About? :  string
    }
}

async function fetchPostData(){
    const postsdata = await axios.get("http://localhost:3001/posts");
    return postsdata;
}


export function Feed(){
    const [postarr , setpostarr] = useState<IFeed[] | []>([]);
    useEffect(() =>{
        let f = async ()=>{
            try{
                let postsdata = await fetchPostData();
                setpostarr(postsdata.data.posts);
            }
            catch(e){
                if (e){
                    setpostarr([]);

                }
            }
        }
        f();
    }, []);
    return (
        <div>
            {(postarr.length !=0) ?  
            postarr.map((post : any)=>(
                <Post 
                pp = {post.owner.ppic }
                pname = {post.owner.name}
                desc = {post.owner.subheading}
                CreatedAt = {post.owner.CreatedAt}    
                content = {post.content}
                contentimg = {post.contentimg}
            />    
            ))
             : "Loading....."  }
        </div>
    )
}

export default Feed
