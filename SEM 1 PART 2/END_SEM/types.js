import {z} from "zod";

export const Signupschema = z.object({
    name : z.string(),
    email : z.email(),
    password : z.string().min(6),
    role : z.string("teacher" || "student")
})

export const Signinschema = z.object({
    email : z.email(),
    password : z.string()
})

export const classSchema = z.object({
    className: z.string()
})

export const studentSchema = z.object({
    studentId: z.string()
})

export const attendanceSchema = z.object({
    classId : z.string()
})