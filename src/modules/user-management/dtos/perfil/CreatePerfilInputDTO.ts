import { z } from "zod";

export const CreatePerfilInputZod = z.object({
    foto: z.string(),
    nomeDeUsuario: z.string().min(3).max(50),
    tema: z.string().regex(/^[a-zA-Z]+$/),
    fonte: z.number().min(4).max(12)
})

export type CreatePerfilInputDTO = z.infer<typeof CreatePerfilInputZod>;