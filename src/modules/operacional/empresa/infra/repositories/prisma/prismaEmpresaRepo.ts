import { Empresa, PrismaClient } from "@prisma/client";
import { EmpresaRepository } from "../interfaceDB/EmpresaRepository";
import { CreateEmpresaDTO } from "../../../dtos/CreateEmpresaDTO";
import { ListEmpresaDTO } from "../../../dtos/listEmpresaDTO";
import { DadosGerais } from "../../../domain/value-objects/dadosGerais/dadosGerais";
import { GetEmpresaDTO } from "../../../dtos/getEmpresaDTO";
import { EmpresaNotExistsError } from "../../../../../shared/errors/empresa/empresaNotExistsError";

const prisma = new PrismaClient();

export class PrismaEmpresaRepository implements EmpresaRepository {
    // async update(data: UpdateEmpresaDTO, id: string): Promise<Empresa | null> {
    //     const {nome, permissoes} = data;
    //     try {
    //         const user = prisma.user.update({
    //             where: {
    //                 id,
    //             },
    //             data: {
    //                 nome, permissoes,
    //             },
    //         })
    //         return user
    //     } catch (err){
    //         console.log(err)
    //         return null
    //     }     
    // }

    async findById(id: string): Promise<Empresa | null> {
            return prisma.empresa.findUnique({ where: { id } });
        }

    async findByRegistro(registro: string): Promise<Empresa | null> {
        return prisma.empresa.findFirst({ where: {DadosFiscais: { is: {registro} } } });
    }

    async create(data: CreateEmpresaDTO): Promise<Empresa | null> {
         try{
            const {DadosFiscais, DadosGerais, DadosFinanceiros, User} = data;
             const empresa = await prisma.empresa.create({
                data: {
                    ativa: true,
                    DadosFiscais: {
                        create:
                        {
                            registro: DadosFiscais.registro,
                            classificacao: DadosFiscais.classificacao,
                            camposEspecificos: DadosFiscais.camposEspecificos
                        }
                    },
                    DadosGerais: {
                        create:
                        {
                            nome: DadosGerais.nome,
                            dataDeFundacao: DadosGerais.dataDeFundacao,
                            logo: DadosGerais.logo,
                            endereco: {
                                create:{
                                    pais: DadosGerais.endereco.pais,
                                    dados: DadosGerais.endereco
                                }
                            }
                        }
                    },
                    DadosFinanceiros: {
                        create:
                        {
                            contaBancaria: DadosFinanceiros.contaBancaria
                        }
                    },
                    usuarios:{
                        create:{
                            nome: User.nome,
                            email: User.email,
                            senha: User.senha,
                            admin: User.admin,
                            permissoes: User.permissoes,
                            perfil:{
                                create:{
                                    nomeDeUsuario: User.perfil.nomeDeUsuario,
                                    fonte: User.perfil.fonte,
                                    foto: User.perfil.foto,
                                    tema: User.perfil.tema
                                }
                            }
                        }
                    }
                }
            })
            return empresa
        }catch (error){
            console.log(error)
            return null
        }
    }

    async get(id: string): Promise<GetEmpresaDTO | null>{
         try {
             const empresa = await prisma.empresa.findUnique({
                where: {
                    id,
                },
              select: {
                 id: true,
                 ativa: true,
                 dataCadastro: true,
                 usuarios:{
                    select:{
                        id: true,
                        nome: true
                    }
                 },
                 DadosGerais:{
                    select:{
                        nome: true,
                        dataDeFundacao: true,
                        logo: true,
                        endereco:{
                            select:{
                                pais: true,
                                dados: true,
                            }
                        }
                    }
                 },
                 DadosFiscais:{
                    select:{
                        registro: true,
                        classificacao: true,
                        camposEspecificos: true
                    }
                 },
                 DadosFinanceiros:{
                    select:{
                        contaBancaria: true
                    }
                 }
               },
             })
      
             if (!empresa) throw new EmpresaNotExistsError
      
             return empresa
      
           } catch (error) {
             throw new Error()
           }
     }

    async list(): Promise<ListEmpresaDTO[]> {
        return await prisma.empresa.findMany({
            select: {
                id: true,
                DadosGerais: {
                    select:{
                        nome: true
                    }
                }
             }
         });
    }
    
    async delete(id: string): Promise<Empresa | null> {
        return prisma.empresa.delete({ where: { id } });
    }
    
}