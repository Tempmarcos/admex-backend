import { z } from "zod";
import { CreatePerfilInputZod } from "../perfil/CreatePerfilInputDTO";


export const CreateUserInputZod = z.object({
    nome: z.string().min(3, "Nome muito curto").max(50, "Nome muito longo")
    .regex(/^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$/, "Nome não pode conter caracteres especiais"),
    email: z.string().email(),
    senha: z.string().min(6, "Senha muito curta").max(500),
    permissoes: z.string().array(),
    perfil: CreatePerfilInputZod
})

export type CreateUserInputDTO = z.infer<typeof CreateUserInputZod>;