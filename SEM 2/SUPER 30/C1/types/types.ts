import z from "zod";

export const signupschema = z.object({
    name :  z.string(),
    email: z.email(), 
    password: z.string(), 
    role :  z.enum(["customer" , "owner"]), 
    phone: z.string().optional(),
    createdAt : z.date().optional()
})

export const siginschema = z.object({
        email : z.string(),
        password : z.string()
})

export const hotelschema = z.object({
    name : z.string(),
    description : z.string().optional(),
    city : z.string(),
    country : z.string(),
    amenities : z.array(z.string()),
    rating : z.number().optional(),
    total_reviews: z.number().optional()
})

export const roomschema = z.object({
    roomNumber : z.string(),
    roomType: z.string(),
    pricePerNight :z.number(),
    maxOccupancy : z.number()
})

