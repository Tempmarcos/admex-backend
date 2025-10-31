import { z } from "zod";

export const UpdatePerfilInputZod = z.object({
    foto: z.string().optional(),
    nomeDeUsuario: z.string().min(3).max(50),
    tema: z.string().regex(/^[a-zA-Z]+$/).optional(),
})

export type UpdatePerfilInputDTO = z.infer<typeof UpdatePerfilInputZod>;