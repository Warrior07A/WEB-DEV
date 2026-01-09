import {z} from "zod";

export const inputtodoSchema = z.object({
    title : z.string(),
    desc: z.string(),
    completed : z.boolean()
})

export const SignUpSchema = z.object({
    name: z.string(),
    email : z.email(),
    password : z.string(),
    todos : z.array(inputtodoSchema)
})

export const SigninSchema = z.object({
    email : z.email(),
    password : z.string()
})

