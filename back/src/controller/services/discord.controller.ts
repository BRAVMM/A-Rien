import { OAuth } from '../../models/oauth.model';
import { Request, Response } from 'express';
import { TokenData } from '../../interfaces/token.interface';
import { CustomRequest } from '../../interfaces/request.interface';
import { EncryptionService } from '../../services/encryption.service';

/**
 * Middleware to register OAuth tokens for a user.
 * This function takes access token, refresh token, and expiry time from the request body,
 * encrypts these tokens, and then stores them in the database along with the service ID and user ID.
 * It assumes the user has been authenticated and their information is available in the request.
 *
 * @param {Request} req - The Express request object containing the user's information and the OAuth tokens.
 * @param {Response} res - The Express response object used for sending responses.
 *
 * @throws Will send a 400 (Bad Request) response if any of the required tokens (access or refresh) or expiresIn is not provided in the request.
 * @throws Will send a 500 (Internal Server Error) response if there is an unexpected error during the process.
 *
 * @example
 * POST /api/registerToken
 * Body: {
 *   "accessToken": "user_access_token",
 *   "refreshToken": "user_refresh_token",
 *   "expiresIn": 3600,
 *   "serviceId": 1
 * }
 *
 * // Successful response
 * Status: 201
 * Response Body: { "id": new_oauth_data_id }
 *
 * // Error response for missing data
 * Status: 401
 * Response Body: { "error": "No tokens provided" }
 *
 * // Error response for server error
 * Status: 500
 * Response Body: { "error": "An unexpected error occurred" }
 */
const registerToken = async (req: Request, res: Response): Promise<Response> => {
    const userInfo: TokenData = (req as CustomRequest).user

    try {
        const { accessToken, refreshToken, expiresIn, serviceId } = req.body
        const encryptedAccessToken: { iv: string; content: string } = EncryptionService.encrypt(accessToken)
        const encryptedRefreshToken: { iv: string; content: string } = EncryptionService.encrypt(refreshToken)

        if (!process.env.DISCORD_SERVICE_ID || Number(process.env.DISCORD_SERVICE_ID) !== serviceId) {
            return res.status(400).json({ error: "Wrong service id" })
        }
        if (!accessToken || !refreshToken || !expiresIn) {
            return res.status(401).json({ error: "No tokens provided" })
        }
        if (!req.params.guildId) {
            return res.status(401).json({ error: "No guild ID provided" })
        }
        console.log("registerToken :\n accessToken : " + accessToken + "\n refreshToken : " + refreshToken + "\n expiresIn : " + expiresIn + "\n serviceId : " + serviceId + "\n userInfo : " + userInfo.userId);
        const OAuthData = await OAuth.create({
            serviceId: serviceId,
            encryptedAccessToken: encryptedAccessToken.content,
            encryptedRefreshToken: encryptedRefreshToken.content,
            ivAccess: encryptedAccessToken.iv,
            ivRefresh: encryptedRefreshToken.iv,
            expiresIn: expiresIn,
            ownerId: userInfo.userId,
            OAuthEmail: "",
            guildId: req.params.guildId,
        });
        return res.status(201).json({ id: OAuthData.id })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "An unexpected error occurred" })
    }
}

export { registerToken };
