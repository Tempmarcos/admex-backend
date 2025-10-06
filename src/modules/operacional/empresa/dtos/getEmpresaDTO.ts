import { z } from "zod";


const getEmpresaSchema = z.object({
    dataCadastro: z.date(),
    usuarios: z.object({
        id: z.string(),
        nome: z.string(),
    }).array(),
    DadosGerais: z.object({
        nome: z.string(),
        nomeFantasia: z.string(),
        dataDeFundacao: z.date(),
        logo: z.string().nullish(),
        endereco: z.object({
            pais: z.string(),
            dados: z.any()
        }).nullish()
    }).nullish(),
    DadosFiscais: z.object({
        registro: z.string(),
        classificacao: z.string(),
        camposEspecificos: z.any()
    }).nullish(),
    DadosFinanceiros: z.object({
        conta: z.string().nullish(),
        banco: z.string().nullish(),
        agencia: z.string().nullish(),
        pix: z.string().nullish()
    }).nullish()
})

export type GetEmpresaDTO = z.infer<typeof getEmpresaSchema>