import z from "zod";



export const signupschema = z.object({
    name : z.string(),
    email : z.email(),
    password : z.string(),
    role : z.enum(["admin" , "learner" ])
})

export const signinschema = z.object({
    email : z.email(),
    password : z.string()
})

export const courseschema = z.object({
    title : z.string(),
    description : z.string(),
    amount : z.number()
})

export const lectureschema = z.object({
    title : z.string(),
    videoUrl : z.string(),
    order: z.number()
})

