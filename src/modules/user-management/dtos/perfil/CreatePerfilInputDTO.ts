import { z } from "zod";

export const CreatePerfilInputZod = z.object({
    nomeDeUsuario: z.string().min(3).max(50),
    foto: z.string().optional(),
    tema: z.string().regex(/^[a-zA-Z]+$/).optional(),
    fonte: z.number().min(4).max(12).optional()
})

export type CreatePerfilInputDTO = z.infer<typeof CreatePerfilInputZod>;