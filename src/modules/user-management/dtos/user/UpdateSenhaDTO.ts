import { z } from "zod";

export const UpdateSenhaSchema = z.object({
    senhaAtual: z.string().min(6, "Senha muito curta").max(500),
    novaSenha: z.string().min(6, "Senha muito curta").max(500)
})

export type UpdateSenhaDTO = z.infer<typeof UpdateSenhaSchema>;