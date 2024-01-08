import { OAuth } from '../../models/oauth.model';
import { Request, Response } from 'express';
import { TokenData } from '../../interfaces/token.interface';
import { CustomRequest } from '../../interfaces/request.interface';
import { EncryptionService } from '../../services/encryption.service';

const registerToken = async (req: Request, res: Response): Promise<Response> => {
    const userInfo : TokenData = (req as CustomRequest).user

    try {
        const { accessToken, refreshToken, expiresIn, serviceId} = req.body
        const encryptedAccessToken : { iv: string; content: string } = EncryptionService.encrypt(accessToken)
        const encryptedRefreshToken : { iv: string; content: string } = EncryptionService.encrypt(refreshToken)

        if (!process.env.SPOTIFY_SERVICE_ID || Number(process.env.SPOTIFY_SERVICE_ID) !== serviceId) {
            return res.status(400).json({ error: "Wrong service id" })
        }
        if (!accessToken || !refreshToken || !expiresIn) {
            return res.status(401).json({ error: "No tokens provided" })
        }
        console.log("registerToken :\n accessToken : " + accessToken + "\n refreshToken : " + refreshToken + "\n expiresIn : " + expiresIn + "\n serviceId : " + serviceId + "\n userInfo : " + userInfo.userId);
        const OAuthData = await OAuth.create({
            serviceId : serviceId,
            encryptedAccessToken : encryptedAccessToken.content,
            encryptedRefreshToken: encryptedRefreshToken.content,
            ivAccess : encryptedAccessToken.iv,
            ivRefresh : encryptedRefreshToken.iv,
            expiresIn : expiresIn,
            ownerId : userInfo.userId,
        });
        return res.status(201).json({id: OAuthData.id})
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "An unexpected error occurred" })
    }
}

export { registerToken };