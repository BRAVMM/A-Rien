import { OAuth } from "../../models/oauth.model"
import { Request, Response } from 'express';
import { TokenData } from '../../interfaces/token.interface';
import { CustomRequest } from '../../interfaces/request.interface';
import { EncryptionService } from '../../services/encryption.service';
import { getUserEmailMicrosoft } from '../../services/API/Spotify/getUserEmail.service';
import { ReactionData } from "../../models/reactionData.model";

const removeOauthTokenByServiceId = async (req: Request, res: Response): Promise<Response> => {
    const userInfo : TokenData = (req as CustomRequest).user

    try {
        const { serviceId } = req.body
        await OAuth.destroy({where: {serviceId: serviceId, ownerId: userInfo.userId}})
        res.status(200).json({ message: "Token deleted" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Failed to delete token" })
    }
}

export { removeOauthTokenByServiceId }