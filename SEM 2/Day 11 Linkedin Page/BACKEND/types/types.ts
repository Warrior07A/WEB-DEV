import z from "zod";

export const SignupSchema = z.object({
    name : z.string(),
    email  :z.email(),
    password : z.string(),
    subheading :z.string().optional(),
    coverpic:z.string().optional(),
    ppic:z.string().optional(),
    Location:z.string().optional(),
    About:z.string().optional(),
}) 

export const SigninSchema =  z.object({
    email  :z.email(),
    password : z.string()
})

export const PostSchema = z.object({
    content : z.string(),
    contentimg : z.string().optional(),   
    contentvdo : z.string().optional()

})