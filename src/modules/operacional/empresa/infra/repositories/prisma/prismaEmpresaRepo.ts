import { Empresa, PrismaClient } from "@prisma/client";
import { EmpresaRepository } from "../interfaceDB/EmpresaRepository";
import { CreateEmpresaDTO } from "../../../dtos/CreateEmpresaDTO";
import { ListEmpresaDTO } from "../../../dtos/listEmpresaDTO";
import { DadosGerais } from "../../../domain/value-objects/dadosGerais/dadosGerais";
import { GetEmpresaDTO } from "../../../dtos/getEmpresaDTO";
import { EmpresaNotExistsError } from "../../../../../shared/errors/empresa/empresaNotExistsError";
import { CreateDadosGeraisDTO } from "../../../dtos/createDadosGeraisDTO";
import { CreateDadosFinanceirosDTO } from "../../../dtos/createDadosFinanceirosDTO";
import { DadosFiscaisDTO } from "../../../dtos/DadosFiscais/DadosFiscaisDTO";

const prisma = new PrismaClient();

export class PrismaEmpresaRepository implements EmpresaRepository {
    async verifyRegistro(registro: string): Promise<boolean> {
        registro = registro.toString()
        const resposta = await prisma.empresa.findFirst({ where: {DadosFiscais: { is: {registro} } } });
        if (resposta != null){
            // console.log(resposta)
            return false
        } else {
            return true
        }
    }
    async updateDadosGerais(data: CreateDadosGeraisDTO, id: string): Promise<Empresa | null> {
         const {nome, dataDeFundacao, logo, endereco} = data;
         try {
             const user = prisma.empresa.update({
                where: {
                     id,
                 },
                 data: {
                     DadosGerais:{
                        update:{
                            nome, dataDeFundacao, logo,
                            endereco:{
                                update:{
                                    pais: endereco.pais,
                                    dados: endereco
                                }
                            }
                        }
                     }
                 },
             })
             return user
         } catch (err){
             console.log(err)
             return null
         }     
     }

     async updateDadosFiscais(data: DadosFiscaisDTO, id: string): Promise<Empresa | null> {
        const {registro, classificacao, camposEspecificos} = data;
        try {
            const user = prisma.empresa.update({
               where: {
                    id,
                },
                data: {
                    DadosFiscais:{
                       update:{
                           registro, classificacao,
                           camposEspecificos:{
                            update:{
                                camposEspecificos
                            }
                           }
                       }
                    }
                },
            })
            return user
        } catch (err){
            console.log(err)
            return null
        }     
    }

     async updateDadosFinanceiros(data: CreateDadosFinanceirosDTO, id: string): Promise<Empresa | null> {
        const {contaBancaria} = data;
        try {
            const user = prisma.empresa.update({
               where: {
                    id,
                },
                data: {
                    DadosFinanceiros:{
                       update:{
                           contaBancaria
                       }
                    }
                },
            })
            return user
        } catch (err){
            console.log(err)
            return null
        }     
    }

    async findById(id: string): Promise<Empresa | null> {
            return prisma.empresa.findUnique({ where: { id } });
        }

    async findByRegistro(registro: string): Promise<Empresa | null> {
        return prisma.empresa.findFirst({ where: {DadosFiscais: { is: {registro} } } });
    }

    async create(data: CreateEmpresaDTO): Promise<Empresa | null> {
         try{
            const {DadosFiscais, DadosGerais, DadosFinanceiros, User} = data;
            const { pais, ...dadosSemPais } = DadosGerais.endereco;
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
                            nomeFantasia: DadosGerais.nomeFantasia,
                            dataDeFundacao: DadosGerais.dataDeFundacao,
                            logo: DadosGerais.logo,
                            endereco: {
                                create:{
                                    pais: pais,
                                    dados: dadosSemPais
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
                        nomeFantasia: true,
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