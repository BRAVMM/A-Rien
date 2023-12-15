import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import { TokenData } from "../interfaces/token.interface";
import { CustomRequest } from "../interfaces/request.interface";

/* Check environment variables */
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
}

/**
 * Method that verify a token and then pass some information to the next request.
 * @param {Request} req - This is the request object
 * @param {Response} res - This is the response object
 * @param {NextFunction} next - This is the next request that will be called
 */
const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    if (req.headers && req.headers.authorization) {
        const secret : Secret = process.env.JWT_SECRET as Secret;

        try {
            const token : string = req.headers.authorization.split(' ')[1]
            const decodedToken : TokenData = jwt.verify(token, secret) as TokenData

            (req as CustomRequest).user = decodedToken
            next()
        } catch (error) {
            res.status(401).json({error: 'Unauthorized'})
        }
    } else {
        res.status(401).json({error: 'Authorization header is missing'})
    }
}

export default verifyToken;
