import { z } from "zod";

const CreateUserInputZod = z.object({
    nome: z.string(),
    email: z.string(),
    senha: z.string(),
    permissoes: z.string().array(),
    perfil: z.string().array()
})

export type CreateUserInputDTO = z.infer<typeof CreateUserInputZod>;