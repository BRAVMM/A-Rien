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
        res.status(400).json({ error: "No token provided" })
    }
    try {
        const encryptedToken : { iv: string; content: string } = EncryptionService.encrypt(token)
        const OAuthData = await OAuth.create({
            serviceId : SPOTIFY_ID,
            encryptedOAuthToken : encryptedToken.content,
            iv : encryptedToken.iv,
            ownerID : userInfo.userId,
        });
        res.status(201).json(OAuthData)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "An unexpected error occurred" })
    }
}

export { registerToken };
