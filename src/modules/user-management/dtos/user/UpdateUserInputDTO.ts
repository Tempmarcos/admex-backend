import { z } from "zod";


export const UpdateUserInputZod = z.object({
    nome: z.string().min(3, "Nome muito curto").max(50, "Nome muito longo")
    .regex(/^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$/, "Nome não pode conter caracteres especiais")
    .optional(),
    permissoes: z.string().array().optional(),
})

export type UpdateUserInputDTO = z.infer<typeof UpdateUserInputZod>;