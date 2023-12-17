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
    const userInfo : TokenData = (req as CustomRequest).user

    try {
        const { accessToken, refreshToken, expiresIn, serviceId} = req.body
        const encryptedAccessToken : { iv: string; content: string } = EncryptionService.encrypt(accessToken)
        const encryptedRefreshToken : { iv: string; content: string } = EncryptionService.encrypt(refreshToken)

        if (!accessToken || !refreshToken || !expiresIn) {
            res.status(400).json({ error: "No tokens provided" })
        }
        const OAuthData = await OAuth.create({
            serviceId : SPOTIFY_ID,
            encryptedAccessToken : encryptedAccessToken.content,
            encryptedRefreshToken: encryptedRefreshToken.content,
            ivAccess : encryptedAccessToken.iv,
            ivRefresh : encryptedRefreshToken.iv,
            expiresIn : expiresIn,
            ownerID : userInfo.userId,
        });
        console.log(refreshToken)
        res.status(201).json({id: OAuthData.id})
    } catch (error) {
        res.status(500).json({ error: "An unexpected error occurred" })
    }
}

export { registerToken };
