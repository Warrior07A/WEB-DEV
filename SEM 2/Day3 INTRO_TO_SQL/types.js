import {z} from "zod";

export const signupSchema = z.object({
    name : z.string(),
    username : z.string(),
    password : z.string()
})

export const signinSchema = z.object({
    username : z.string(),
    password: z.string()
})


export const todoSchema = z.object({
    title : z.string(),
    description : z.string(),
    completed : z.boolean(),
    user_id : z.number()
})


export const updatetodo = z.object({
    id : z.number(),
    completed: z.boolean()
})