import { Convite, PrismaClient } from "@prisma/client";
import { ConviteRepository } from "../interfaceDB/ConviteRepository";
import { ListConviteDTO } from "../../../dtos/convite/ListConviteDTO";

const prisma = new PrismaClient();

export class PrismaConviteRepository implements ConviteRepository {
    async findByToken(token: string, empresaId: string): Promise<Convite | null> {
        return prisma.convite.findFirst({ where: { empresaId, token } })
    }

    async create(token: string, empresaId: string): Promise<Convite | null> {
        try {
            const convite = await prisma.convite.create({
                data: {
                    token, empresaId
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
                created_at: true
            }
        });
    }
    async delete(id: string): Promise<Convite | null> {
        return prisma.convite.delete({ where: { id } });
    }
}