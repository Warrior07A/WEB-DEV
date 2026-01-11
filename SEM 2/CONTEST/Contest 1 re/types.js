import {z} from "zod";

export const signupSchema = z.object({
    username : z.string(),
    password: z.string()
})

export const signinSchema = z.object({
    username : z.string(),
    password: z.string()
})

export const bookingSchema = z.object({
    "carName": z.string(),
    "days":z.number(),
    "rentPerDay":z.number()
})

export const bookingupdateSchema = z.object({
    "carName": z.string().optional(),
    "days":z.number().optional(),
    "rentPerDay":z.number().optional(),
    "status" : z.string().optional()
})