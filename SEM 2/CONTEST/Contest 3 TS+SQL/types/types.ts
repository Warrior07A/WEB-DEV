import z from "zod";

export const signupschema = z.object({
    email:z.email(),
    password : z.string(),
    name : z.string(),
    role : z.enum(["STUDENT" , "INSTRUCTOR"])
})

export const signinschema = z.object({
    email:z.email(),
    password : z.string()
})

export const coursechema = z.object({
    title  :z.string(),
    description : z.string().optional(),
    price : z.number()
})

export const lessonupdate = z.object({
    title  :z.string().optional(),
    description : z.string().optional(),
    price : z.number().optional()
})

export const lessonschema = z.object({
    title : z.string(),
    content : z.string(),
    courseId : z.string()
})

export const purchaseschema = z.object({
    courseId : z.string()    
})