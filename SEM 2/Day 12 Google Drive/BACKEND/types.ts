import z from "zod";

export const SignupSchema = z.object({
    username : z.string(),
    password : z.string()
})

export const SigninSchema = z.object({
    username : z.string(),
    password : z.string()
})

export const upload = z.object({
    title : z.string(),
    type : z.enum(["FOLDER" , "FILE"]),
    ParentFolderId : z.string().optional()
})

export const fileEntry = z.object({
    title : z.string(),
    url : z.string(),
    ParentFolderId : z.string(),
})