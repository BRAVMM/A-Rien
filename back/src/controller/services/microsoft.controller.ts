import { OAuth } from '../../models/oauth.model';
import { Request, Response } from 'express';
import { TokenData } from '../../interfaces/token.interface';
import { CustomRequest } from '../../interfaces/request.interface';
import { EncryptionService } from '../../services/encryption.service';
import { getUserEmailMicrosoft } from '../../services/API/Spotify/getUserEmail.service';

const registerToken = async (req: Request, res: Response): Promise<Response> => {
    const userInfo : TokenData = (req as CustomRequest).user

    try {
        const { accessToken, refreshToken, expiresIn} = req.body
        const email = await getUserEmailMicrosoft(accessToken)
        console.log("email : " + email);
        const encryptedAccessToken : { iv: string; content: string } = EncryptionService.encrypt(accessToken)
        const encryptedRefreshToken : { iv: string; content: string } = EncryptionService.encrypt(refreshToken)

        if (!accessToken || !refreshToken || !expiresIn) {
            return res.status(401).json({ error: "No tokens provided" })
        }
        console.log("registerToken :\n accessToken : " + accessToken + "\n refreshToken : " + refreshToken + "\n expiresIn : " + expiresIn + "\n serviceId : "  + "\n userInfo : " + userInfo.userId);
        if (!email) {
            return res.status(401).json({ error: "No email provided" })
        }
        if (await OAuth.findOne({where: {OAuthEmail: email, serviceId: process.env.MICROSOFT_SERVICE_ID, ownerId: userInfo.userId}})) {
            return res.status(401).json({ error: "User already logged in" })
        }
        const OAuthData = await OAuth.create({
            serviceId : process.env.MICROSOFT_SERVICE_ID,
            encryptedAccessToken : encryptedAccessToken.content,
            encryptedRefreshToken: encryptedRefreshToken.content,
            OAuthEmail : email,
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

const userHasToken = async (req: Request, res: Response): Promise<Response> => {
    const userInfo : TokenData = (req as CustomRequest).user
    
    try {
        const OAuthData = await OAuth.findOne({where: {ownerId: userInfo.userId, serviceId: process.env.MICROSOFT_SERVICE_ID}})
        if (!OAuthData) {
            return res.status(400).json({ error: "No token found" })
        }
        return res.status(200).json({ OAuthData })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "An unexpected error occurred" })
    }
}

export { registerToken , userHasToken }
