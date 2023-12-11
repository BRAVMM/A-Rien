import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Data of a verified and decoded token.
 */
interface TokenData {
    userId: number;
    iat: number;
    exp: number;
}

/**
 * Method that verify a token and then pass some informations to the next request.
 * @param {Request} req - This is the request object
 * @param {Response} res - This is the response object
 * @param {NextFunction} next - This is the next request that will be called
 */
const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    if (req.headers && req.headers.authorization) {
        const secret : any = process.env.JWT_SECRET;

        try {
            const token = req.headers.authorization.split(' ')[1]
            const decodedToken = jwt.verify(token, secret) as TokenData

            req.body.tokenData = decodedToken
            next()
        } catch (error) {
            res.status(401).json({error: 'Unauthorized'})
            next("[ERROR] : 401, unauthorized")
        }
    } else {
        res.status(511).json({error: 'Network Authentication Required'})
        next("[ERROR] : 511, Network Authentication Required")
    }
}

export default verifyToken;
