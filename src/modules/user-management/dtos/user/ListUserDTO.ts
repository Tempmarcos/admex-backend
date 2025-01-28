import { z } from "zod";


const ListUserZod = z.object({
    id: z.string(),
    nome: z.string(),
})

export type ListUserDTO = z.infer<typeof ListUserZod>;