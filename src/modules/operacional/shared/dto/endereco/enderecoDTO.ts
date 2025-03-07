import { z } from "zod";

const enderecoSchema = z.object({
    pais: z.string().max(2),
    logradouro: z.string(),
    cidade: z.string(),
    codigoPostal: z.string()
})


export type EnderecoDTO = z.infer<typeof enderecoSchema>;
