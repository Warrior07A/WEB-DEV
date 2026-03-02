import z from "zod"


export const todoadd = z.object({
    title : z.string(),
    desc : z.string()
})



