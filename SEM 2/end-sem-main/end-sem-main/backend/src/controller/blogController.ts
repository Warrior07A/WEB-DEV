import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../db";
import { ferr } from "../routes/blogRoute";
import { number } from "zod";
import { blogSchema } from "../utils/type";
const SECRET  ="password123";



export const viewblog = async (req: Request, res: Response) => {
    const id = req.id;
    if (!id) {
        return ferr("id not found", 402, res);
    }
    const blogs = await prisma.blog.findMany();

    if (blogs.length == 0) {
        return res.status(404).send({
            msg : "no bloggs found"
        })
    }
    return res.status(200).send({
        blogs: blogs
    })
};


export const blog = async (req: Request, res: Response) => {
    let qblogId = req.params.blogId as string;
    if (!qblogId) {
        return ferr("BLOG NOT FOUND", 404, res);
    }
    let blogId = number(qblogId);

    let id = req.id;
    if (!id) {
        return ferr("id not found", 402, res);
    }

    const blog = await prisma.blog.findFirst({
        where: {
            id: blogId
        }
    })
    if (!blog) {
        return ferr("NO SUCH BLOG EXISTS", 404, res);
    }
    return res.status(200).send({
        blog: blog
    })

};

export const createblog = async (req: Request, res: Response) => {
    try{
        const blogverif = blogSchema.safeParse(req.body);
        if (!blogverif.success) {
            return ferr("INVALID INPUTS", 401, res);
        }
        let id = req.id ;
        if (!id) {
            return ferr("id not found", 402, res);
        }
        const createblog = await prisma.blog.create({
            data : {
                title : blogverif.data.title,
                user_id : id , 
                content : blogverif.data.content
            }
        })
    
        return res.status(201).send({
            id :  createblog.id,
            msg : "blog created successfully"
        })
    }catch(e){
        return ferr("BLOG NOT CREATED" , 401, res);
    }
};