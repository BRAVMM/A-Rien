import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Op } from "sequelize";
import { OAuth } from '../../models/oauth.model';
import { Request, Response } from 'express';
import { TokenData } from '../../interfaces/token.interface';
import { CustomRequest } from '../../interfaces/request.interface';
import { EncryptionService } from '../../services/encryption.service';

const SPOTIFY_ID : number = 1

const registerToken = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.body
    const userInfo : TokenData = (req as CustomRequest).user

    if (!token) {
        res.status(401).send({"message" : "error"})
    }
    console.log(userInfo.userId)
    console.log(token)
    try {
        const encryptedToken : { iv: string; content: string } = EncryptionService.encrypt(token)
        const user = await OAuth.create({
            serviceId : SPOTIFY_ID,
            encryptedOAuthToken : encryptedToken.content,
            iv : encryptedToken.iv,
            ownerID : userInfo.userId,
        });
        res.status(200).send({"message" : "success"})
    } catch (error) {
        console.log(error)
        res.status(401).send({"message": "error"})
    }
}

export { registerToken };
