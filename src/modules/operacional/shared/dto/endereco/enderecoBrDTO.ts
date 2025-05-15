import { z } from "zod";
import { EnderecoDTO } from "./enderecoDTO";


export const enderecoBRSchema = z.object({
    pais: z.string().max(2),
    logradouro: z.string(),
    cidade: z.string(),
    codigoPostal: z.string(),
    numero: z.string(),
    complemento: z.string().optional(),
    estado: z.string()
})

export type EnderecoBrDTO = EnderecoDTO & {
    estado: string
}