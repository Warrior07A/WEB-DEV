import z from "zod";

export const signupschema = z.object ({
    name: z.string(), 
    email: z.email(),
    password: z.string(),
    role: z.string().optional()
})

export const signinschema = z.object({
    email: z.email(),
    password: z.string()
})


export const contestSchema = z.object({
    title: z.string(),
    description: z.string(),
    startTime: z.date(),
    endTime: z.date()
})

export const mcqschema = z.object({
    questionText: z.string(),
    options: z.array(z.string()),
    correctOptionIndex: z.number(),
    points: z.number()
})

export interface dsashow {
    id : number,
    questionText : string,
    options : string[],
    points : number
}

export interface mcqshow{
    id : number,
    questionText : string,
    options : string[],
    points : number
}
