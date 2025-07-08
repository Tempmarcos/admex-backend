import { z } from "zod";


const CreateConviteZod = z.object({
    token: z.string(),
    expires_at: z.date(),
    created_by: z.string()
})

export type CreateConviteDTO = z.infer<typeof CreateConviteZod>;