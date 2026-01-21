import {xid, z} from "zod";
import { describe } from "zod/v4/core";

export const signupschema = z.object({
    name : z.string(),
    email : z.email(),
    password : z.string(),
    role : z.enum(["contestee" , "creator"])
})

export const signinschema = z.object({
    email : z.email(),
    password : z.string()
})

export const contestSchema = z.object({
    title : z.string(),
    description: z.string(),
    startTime : z.date(),
    endTime : z.date()
})
