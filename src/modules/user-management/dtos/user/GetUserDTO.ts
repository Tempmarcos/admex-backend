import { z } from "zod";
import { CreatePerfilInputDTO, CreatePerfilInputZod } from "../perfil/CreatePerfilInputDTO";
import { User } from "@prisma/client";


export type GetUserDTO = Omit<User, "senha"> & {
    perfil: any
}