import { z } from "zod";
import { UpdatePerfilInputZod } from "../perfil/UpdatePerfilInputDTO";


export const UpdateUserInputZod = z.object({
    nome: z.string().min(3, "Nome muito curto").max(50, "Nome muito longo")
    .regex(/^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$/, "Nome não pode conter caracteres especiais")
    .optional(),
    email: z.string().email().optional(),
    senha: z.string().min(3, "Senha muito curta").optional(),
    permissoes: z.string().array().optional(),
    perfil: UpdatePerfilInputZod
})

export type UpdateUserInputDTO = z.infer<typeof UpdateUserInputZod>;