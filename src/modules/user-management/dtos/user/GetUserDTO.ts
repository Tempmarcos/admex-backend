import { z } from "zod";
import { CreatePerfilInputZod } from "../perfil/CreatePerfilInputDTO";
import { User } from "@prisma/client";


const GetUserZod = z.object({
    id: z.string(),
    nome: z.string().min(3, "Nome muito curto").max(50, "Nome muito longo")
    .regex(/^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$/, "Nome não pode conter caracteres especiais"),
    email: z.string().email(),
    permissoes: z.string().array(),
    perfil: CreatePerfilInputZod,
    created_at: z.date(),
    updatedAt: z.date()
})

// export type GetUserDTO = z.infer<typeof GetUserZod>;

export type GetUserDTO = Omit<User, "senha">