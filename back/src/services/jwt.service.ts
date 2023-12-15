/**
 * @fileoverview jwt service
 */

import jwt from 'jsonwebtoken';

/** Check if all environment variables are defined */
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

if (!process.env.JWT_TOKEN_EXPIRATION) {
    throw new Error('JWT_TOKEN_EXPIRATION is not defined in the environment variables');
}

/** Get typed environment variables. */
const JWT_SECRET: string = process.env.JWT_SECRET;
const JWT_TOKEN_EXPIRATION: string = process.env.JWT_TOKEN_EXPIRATION;

namespace JwtService {
    export function generateToken(id: number): string {
        return jwt.sign({userId: id}, JWT_SECRET, {expiresIn: JWT_TOKEN_EXPIRATION});
    }

}

export {JwtService}
