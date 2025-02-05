import { z } from "zod";

export const UpdatePerfilInputZod = z.object({
    foto: z.string().optional(),
    nomeDeUsuario: z.string().min(3).max(50).optional(),
    tema: z.string().regex(/^[a-zA-Z]+$/).optional(),
    fonte: z.number().min(4).max(12).optional()
})

export type UpdatePerfilInputDTO = z.infer<typeof UpdatePerfilInputZod>;