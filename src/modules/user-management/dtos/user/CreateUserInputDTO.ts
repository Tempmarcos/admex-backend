import { z } from "zod";
import { CreatePerfilInputZod } from "../perfil/CreatePerfilInputDTO";


const CreateUserInputZod = z.object({
    nome: z.string(),
    email: z.string(),
    senha: z.string(),
    permissoes: z.string().array(),
    perfil: CreatePerfilInputZod
})

export type CreateUserInputDTO = z.infer<typeof CreateUserInputZod>;