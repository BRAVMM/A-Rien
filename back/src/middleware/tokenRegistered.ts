import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Method that verify a token and then pass some informations to the next request.
 * @param {Request} req - This is the request object
 * @param {Response} res - This is the response object
 * @param {NextFunction} next - This is the next request that will be called
 */
const tokenRegistered = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    /*TODO*/
}

export default tokenRegistered;
