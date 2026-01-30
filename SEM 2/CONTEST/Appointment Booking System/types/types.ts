import { password } from "bun";
import z from "zod";

export const signupschema = z.object({
    name : z.string(),
    email : z.email(),
    password : z.string(),
    role : z.enum(["USER", "SERVICE_PROVIDER"])
})


export const signinschema = z.object({
    email:z.string(),
    password : z.string()
})

export const serviceschema = z.object({
    name : z.string(),
    type : z.enum([
                    "MEDICAL",
                    "HOUSE_HELP",
                    "BEAUTY",
                    "FITNESS",
                    "EDUCATION",
                    "OTHER"]
                ),
    durationMinutes : z.union([
                            z.literal(30),
                            z.literal(60),
                            z.literal(90),
                            z.literal(120)
                            ])
})

export const avaischemea = z.object({
    dayOfWeek : z.union(
        [
            z.literal(0),
            z.literal(1),
            z.literal(2),
            z.literal(3),
            z.literal(4),
            z.literal(5),
            z.literal(6),
        ]
    ),
    startTime : z.string(), 
    endTime : z.string()
})