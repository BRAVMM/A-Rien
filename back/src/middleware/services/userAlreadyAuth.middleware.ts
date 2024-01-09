import { NextFunction, Request, Response } from "express";
import { TokenData } from "../../interfaces/token.interface";
import { CustomRequest } from "../../interfaces/request.interface";
import { OAuth } from "../../models/oauth.model";
import { EncryptionService } from "../../services/encryption.service";
import {getUserEmail, getUserEmailMicrosoft } from "../../services/API/Spotify/getUserEmail.service";

/**
 * Middleware that checks if a user is already authenticated with a specific service.
 * The middleware retrieves all OAuth tokens associated with a given serviceId,
 * then invokes a service-specific callback to check if the user associated with the new access token
 * is already authenticated. It requires 'serviceId' and 'accessToken' in the request body,
 * and also relies on user information being present in the custom request property.
 *
 * @param {Request} req - The Express request object, containing serviceId, accessToken, and user information.
 * @param {Response} res - The Express response object, used for sending error responses.
 * @param {NextFunction} next - The callback to pass control to the next middleware in the stack.
 * 
 * @throws Will send a 401 (Unauthorized) response if the user information is not found, if the service is undefined,
 * or if it is determined that the user is already authenticated with the service.
 *
 * @example
 * POST /api/userAlreadyAuth
 * Body: { "serviceId": 1, "accessToken": "new_spotify_access_token" }
 * 
 * // Successful execution passes control to the next middleware
 * 
 * // Error responses:
 * // - If user info is missing: { "error": "User not found" }
 * // - If service is undefined: { "error": "Service undefined" }
 * // - If user is already authenticated: { "error": "User already logged in" }
 */
const userAlreadyAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userInfo : TokenData = (req as CustomRequest).user

    if (!userInfo) {
        res.status(401).json({error: "User not found"});
        return;
    }
    try {
        const {accessToken, refreshToken} = req.body

        if (!accessToken || !refreshToken) {
            res.status(400).json({error: "Missing required parameters"});
            return;
        }
        const userEmail = await getUserEmail(accessToken)
        const token : OAuth | null = await OAuth.findOne({
            where: {
                OAuthEmail: userEmail
            }
        });

        if (token) {
            const encryptedAccessToken : {iv: string, content: string} = EncryptionService.encrypt(accessToken)
            const encryptedRefreshToken : {iv: string, content: string} = EncryptionService.encrypt(refreshToken)

            token.update({
                encryptedAccessToken: encryptedAccessToken.content,
                encryptedRefreshToken: encryptedRefreshToken.content,
                ivAccess: encryptedAccessToken.iv,
                ivRefresh: encryptedRefreshToken.iv,
            })
            res.status(200).json({message: 'New token registered'})
            return
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({error: "User already logged in"});
        return;
    }
}

const userAlreadyAuthMicrosoft = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userInfo : TokenData = (req as CustomRequest).user

    if (!userInfo) {
        res.status(401).json({error: "User not found"});
        return;
    }
    try {
        const {accessToken, refreshToken} = req.body

        if (!accessToken || !refreshToken) {
            res.status(400).json({error: "Missing required parameters"});
            return;
        }
        const userEmail = await getUserEmailMicrosoft(accessToken)
        const token : OAuth | null = await OAuth.findOne({
            where: {
                OAuthEmail: userEmail
            }
        });

        if (token) {
            const encryptedAccessToken : {iv: string, content: string} = EncryptionService.encrypt(accessToken)
            const encryptedRefreshToken : {iv: string, content: string} = EncryptionService.encrypt(refreshToken)

            token.update({
                encryptedAccessToken: encryptedAccessToken.content,
                encryptedRefreshToken: encryptedRefreshToken.content,
                ivAccess: encryptedAccessToken.iv,
                ivRefresh: encryptedRefreshToken.iv,
            })
            res.status(200).json({message: 'New token registered'})
            return
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({error: "User already logged in"});
        return;
    }
}

export  {userAlreadyAuth, userAlreadyAuthMicrosoft};
