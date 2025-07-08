import { z } from "zod";


const ListConviteZod = z.object({
    id: z.string(),
    token: z.string(),
    usado: z.boolean(),
    cancelado: z.boolean(),
    created_at: z.date(),
    created_by: z.string()
})

export type ListConviteDTO = z.infer<typeof ListConviteZod>;