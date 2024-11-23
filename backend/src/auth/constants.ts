import * as dotenv from 'dotenv';

//POSSIVELMENTE NÃO É NECESSARIO UM ARQUIVO DE CONSTANTES


dotenv.config();

export const jwtConstants = {
    secret: process.env.SECRET_KEY || 'defaultSecret', 
};