import jwt from 'jsonwebtoken';
import { env } from '../../../../../env';
import { AuthInterface } from './authInterface';

export class JWTService implements AuthInterface{
    // sign(payload: object): Promise<string | null> {
    //     throw new Error('Method not implemented.');
    // }
    // verify(token: string): Promise<string | null> {
    //     throw new Error('Method not implemented.');
    // }

     async sign(payload: object): Promise<string> {
        const secret : string= env.JWT_SECRET;
        const expiration : any= env.EXPIRES;
        
        return await jwt.sign(payload, secret, {expiresIn: expiration})
    }

    async verify(token: string): Promise<jwt.JwtPayload | null> {
        try{
            return await jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
        }catch (error) {
            return null;
          }
    }
}