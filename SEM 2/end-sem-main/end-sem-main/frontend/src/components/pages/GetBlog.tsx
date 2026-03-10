import { apiClient } from "@/lib/axios-instance";
import axios from "axios"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Blog from "../Blog";

interface BlogResponse{
    id   : number
  title   : string
  content : string
  user_Id : number
}


export default function GetBlog(){
    
    const [blogs, setblog] = useState<BlogResponse[]>([]);

    async function getblogs(){
       const response = await apiClient.get<BlogResponse[]>("/blogs/all");
       console.log(response.data.blogs)
       if (response.data) {
            let arr = response.data.blogs.map((blog: any) => {
                return {
                    id: blog.id,
                    title : blog.title,
                    content : blog.content
                }
            })
            setblog(arr);
        }
    }

    useEffect(()=>{
        getblogs();
    } , [])


    return(
        <div>
            <div className="w-full h-30 bg-green-900">
                100x Blogs
            </div>
            <div className="grid grid-cols-5 row-auto bg-amber-300 border ">
            {blogs.map((blog) =>(
                <Blog title = {blog.title} content = {blog.content}/>
            ))}
            </div>

        </div>


    )
}