import jwt from 'jsonwebtoken';
import { env } from '../../../../../env';
import { AuthInterface } from './authInterface';

export class JWTService implements AuthInterface{
     async sign(payload: object, expiration: any): Promise<string> {
        const secret : string= env.JWT_SECRET;
        // const expiration : any= env.EXPIRES;
        if(!expiration || typeof(expiration) != 'string'){
            expiration = '6h'
        }
        
        // console.log(secret + ' ' + expiration)

        const token = jwt.sign(payload, secret, {expiresIn: expiration});

        // console.log(token)
        return token
    }

    async verify(token: any): Promise<any | null> {
        try{
            return await jwt.verify(token, env.JWT_SECRET);
        }catch (error) {
            return null;
          }
    }
}