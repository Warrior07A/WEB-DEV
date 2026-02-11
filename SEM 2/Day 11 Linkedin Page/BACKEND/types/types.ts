import z from "zod";

export const SignupSchema = z.object({
    name : z.string(),
    email  :z.email(),
    password : z.string()
}) 

export const SigninSchema =  z.object({
    email  :z.email(),
    password : z.string()
})

export const PostSchema = z.object({
    content : z.string(),
    contentImg : z.string().optional(),   
    contentvdo : z.string().optional()

})