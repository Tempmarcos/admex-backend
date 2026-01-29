import { z } from "zod"

enum status {
    Criada = 'criada',
    Enviada = 'enviada',
    Aprovada = 'aprovada',
    Executada = 'executada',
    Cancelada = 'cancelada'
}

export const getPropostaSchema = z.object({
    id: z.string(),
    codigo: z.string(),
    descricao: z.string().optional(),
    tituloProjeto: z.string().optional(),
    endereco: z.string().optional(),
    cliente: z.object({
        nome: z.string()
    }),
    updatedAt: z.string(),
    createdAt: z.string(),
    status: z.nativeEnum(status),
    revisoes: z.array(z.object({
        id: z.string(),
        dataProposta: z.string(),
        valorTotal: z.number(),
        numeroRevisao: z.number(),
        createdAt: z.string(),
        aprovado: z.boolean(),
        executado: z.boolean(),
        itens: z.array(z.object({
            id: z.string(),
            nome: z.string(),
            preco: z.number(),
            quantidade: z.number(),
            unidadeDeMedida: z.string()
        }))
    }))
})

export type GetPropostaDTO = z.infer<typeof getPropostaSchema>