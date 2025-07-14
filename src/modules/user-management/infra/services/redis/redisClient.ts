import { createClient } from 'redis';

const redisClient = createClient();
redisClient.connect().then(() => console.log('Redis conectado')).catch((err) =>
    console.log('Erro ao conectar com o Redis: ', err.message));

export default redisClient;