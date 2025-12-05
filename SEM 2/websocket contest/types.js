import {z} from "zod";

export const Signupschema = z.object({
    "name": z.string(),
    "email" : z.email(),
    "password": z.string(),
    "role": z.string()
})

export const SigninSchema = z.object({
    "email" : z.email(),
    "password" : z.string()
})

export const QuestionSchema = z.object({
    "text" : z.string(),
    "options" : z.array(z.string()),
    correctOptionIndex : z.number()
})

export const QuizSchema = z.object({
    "title" : z.string(),
    "questions" : z.array(z.object({
        text : z.string(),
        options: z.array(z.string()),
        correctOptionIndex : z.number()
    }))
})