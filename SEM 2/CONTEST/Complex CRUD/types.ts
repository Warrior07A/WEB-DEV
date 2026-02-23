import z from "zod";

export const SignupSchema = z.object({
    username : z.string(),
    password : z.string()
})

export const SigninSchema = z.object({
    username : z.string(),
    password : z.string()
})

export const FolderAdd = z.object({
    title : z.string()    
})

export const FileAdd = z.object({
    title : z.string(),
    type : z.enum(["PDF" , "VIDEO"])
})


