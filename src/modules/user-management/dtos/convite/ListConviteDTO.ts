import { z } from "zod";


const ListConviteZod = z.object({
    id: z.string(),
    token: z.string(),
    usado: z.boolean(),
    cancelado: z.boolean(),
    created_at: z.date(),
    created_by: z.string(),
    used_by: z.string().nullable(),
    expires_at: z.date()
})

export type ListConviteDTO = z.infer<typeof ListConviteZod>;