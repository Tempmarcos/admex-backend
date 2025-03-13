import { Empresa, PrismaClient } from "@prisma/client";
import { EmpresaRepository } from "../interfaceDB/EmpresaRepository";
import { CreateEmpresaDTO } from "../../../dtos/CreateEmpresaDTO";

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

    // async get(id: string): Promise<GetUserDTO | null>{
    //     try {
    //         const user = await prisma.user.findUnique({
    //           where: {
    //             id,
    //           },
    //           select: {
    //             id: true,
    //             empresaId: true,
    //             nome: true,
    //             admin: true,
    //             email: true,
    //             permissoes: true,
    //             created_at: true,
    //             updatedAt: true,
    //             perfil: true
    //           },
    //         })
      
    //         if (!user) throw new UserNotExistsError
      
    //         return user
      
    //       } catch (error) {
    //         throw new Error()
    //       }
    // }

    // async list(empresaId: string): Promise<ListUserDTO[]> {
    //     return await prisma.user.findMany({
    //         // where: empresaId 
    //         select: {
    //             id: true,
    //             nome: true,
    //         }
    //     });
    // }
    
    async delete(id: string): Promise<Empresa | null> {
        return prisma.empresa.delete({ where: { id } });
    }
    
}