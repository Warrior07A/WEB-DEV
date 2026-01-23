import z from "zod";


export const SigninSchema = z.object({
    email : z.email(),
    name : z.string(),
    password : z.string(),
})

export const CreateUserSchema = z.object({
    email : z.email(),
    password : z.string()
})  


export const CreateProjectSchema = z.object({
    title : z.string(),
    description : z.string().optional(),
    userId : z.string()
})

export const CreateTaskSchema = z.object({
    title : z.string(),
    description : z.string().optional(),
    status : z.enum(["TODO" , "IN_PROGRESS", "DONE" ]),
    priority : z.enum(["MEDIUM" , "LOW", "HIGH" ]),
    projectId : z.string()
})

export const UpdateTaskSchema = z.object({

})