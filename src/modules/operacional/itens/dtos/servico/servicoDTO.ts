import { z } from "zod";

enum tipos  {
    Compra = 'compra',
    Venda = 'venda',
}

export const servicoSchema = z.object({
    nome: z.string(),
    tipo: z.nativeEnum(tipos),
    descricao: z.string(),
    preco: z.number(),
    duracao: z.string().optional(),
    cnae: z.string().optional()
})

export type servicoDTO = z.infer<typeof servicoSchema>