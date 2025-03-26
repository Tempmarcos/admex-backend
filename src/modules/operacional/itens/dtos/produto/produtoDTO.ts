import { z } from "zod";

enum tipos  {
    Compra = 'compra',
    Venda = 'venda',
}

export const produtoSchema = z.object({
    nome: z.string(),
    tipo: z.nativeEnum(tipos),
    descricao: z.string(),
    preco: z.number(),
    estoque: z.number().optional(),
    unidadeMedida: z.string().optional(),
})

export type produtoDTO = z.infer<typeof produtoSchema>