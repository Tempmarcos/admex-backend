import redisClient from "./redisClient";


export class CodigoVerificacaoRedis {
    static async salvar(email: string, codigo: string) {
        await redisClient.setEx(`verificacao:${email}`, 300, codigo); // 5 minutos
    }

    static async verificar(email: string, codigo: string): Promise<boolean> {
        const salvo = await redisClient.get(`verificacao:${email}`);
        return salvo === codigo;
    }
}