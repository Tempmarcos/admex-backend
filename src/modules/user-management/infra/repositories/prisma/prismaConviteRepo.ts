import { Convite, PrismaClient } from "@prisma/client";
import { ConviteRepository } from "../interfaceDB/ConviteRepository";
import { ListConviteDTO } from "../../../dtos/convite/ListConviteDTO";
import { CreateConviteDTO } from "../../../dtos/convite/CreateConviteDTO";

const prisma = new PrismaClient();

export class PrismaConviteRepository implements ConviteRepository {
    async cancelarConvite(id: string): Promise<Convite | null> {
        return prisma.convite.update({
            where: {
                id
            },
            data: {
                cancelado: true
            }
        })
    }
    async utilizarConvite(id: string, used_by: string): Promise<Convite | null> {
        return prisma.convite.update({
            where: {
                id
            },
            data: {
                usado: true,
                used_by
            }
        })
    }
    async findByToken(token: string, empresaId: string): Promise<any | null> {
        return prisma.convite.findFirst({
            where: { empresaId, token },
            select: {
                usado: true,
                cancelado: true
            }
        })
    }

    async create(data: CreateConviteDTO, empresaId: string): Promise<Convite | null> {
        const { token, created_by, expires_at } = data;
        try {
            const convite = await prisma.convite.create({
                data: {
                    token, created_by, expires_at, empresaId
                }
            })
            return convite
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async list(empresaId: string): Promise<ListConviteDTO[]> {
        return await prisma.convite.findMany({
            where: { empresaId },
            select: {
                id: true,
                token: true,
                usado: true,
                cancelado: true,
                created_at: true,
                created_by: true
            }
        });
    }
    async delete(id: string): Promise<Convite | null> {
        return prisma.convite.delete({ where: { id } });
    }
}