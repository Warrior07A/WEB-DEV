import z from "zod";

export const signupschema = z.object({
    "name" : z.String(),
    "email" : z.String(),
    "password" : z.String(),
})

export const signinSchema = z.object({
    "email" : z.String(),
    "password" : z.String()
})

export const todoSchema = z.object({
    "title" : z.String(),
    "descr" : z.String(),
    "completed" : z.boolean()
})