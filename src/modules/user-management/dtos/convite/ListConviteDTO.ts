import { z } from "zod";


const ListConviteZod = z.object({
    id: z.string(),
    token: z.string(),
    usado: z.boolean(),
    created_at: z.date()
})

export type ListConviteDTO = z.infer<typeof ListConviteZod>;