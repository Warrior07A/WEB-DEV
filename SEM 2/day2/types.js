import {z} from "zod";

export const signupschema =  z.object(
    {
        "username":z.string(),
        "email": z.string(),
        "password": z.string(),
        "role": z.string(),
    }
)

export const signinSchema = z.object({
    "email" : z.string(),
    "password" : z.string()
})

export const showSchema = z.object({
    movieName: z.string(),
    showTime: z.string(),
    ticketPrice: z.number(),
    availableTickets: z.number(),
  })

export const bookSchema = z.object(
    {
        "showId": z.string(),
        "seats": z.number()
    }
)