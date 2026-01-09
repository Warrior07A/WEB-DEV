import {z} from "zod";

export const SignUpSchema = z.object({
    name: z.string(),
    email : z.email(),
    password : z.string(),
    role : z.string()
})

export const signinSchema = z.object({
    email : z.email(),
    password : z.string()
})

export const quesSchema = z.object({
    text : z.string(),
    options :z.array(z.string()),
    correctOptionIndex : z.number()
})

export const quizSchema = z.object({
    title: z.string(),
    questions : z.array(quesSchema)
})