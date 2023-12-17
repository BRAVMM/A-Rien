import { NextFunction, Request, Response } from "express";
import { TokenData } from "../../interfaces/token.interface";
import { CustomRequest } from "../../interfaces/request.interface";
import { OAuth } from "../../models/oauth.model";
import { EncryptionService } from "../../services/encryption.service";
import refreshSpotifyTokens from "./refreshCallback/spotifyRefresh.middleware";

/**
 * Middleware that refreshes OAuth tokens for a specified service.
 * This function fetches all OAuth tokens associated with the given serviceId and
 * executes a service-specific callback function to refresh these tokens.
 * It requires the 'serviceId' to be provided in the request body.
 * The middleware ensures that the user is authenticated and that the serviceId is valid.
 * 
 * @param {Request} req - The Express request object. It must contain 'serviceId' in the body and user info in the custom request property.
 * @param {Response} res - The Express response object used for sending error responses.
 * @param {NextFunction} next - The callback function to pass control to the next middleware.
 * 
 * @throws Will send a 401 (Unauthorized) response if the user is not found or if the 'serviceId' is not provided.
 * @throws Will send a 500 (Internal Server Error) response if there's an unexpected error during the token refresh process.
 *
 * @example
 * POST /api/refreshTokens
 * Body: { "serviceId": 1 }
 * 
 * // Successful execution (No direct response, but forwards control to the next middleware)
 * 
 * // Error response for missing user or serviceId
 * Status: 401
 * Response Body: { "error": "User not found" } or { "error": "Unknown service" } or { "error": "Unknown service" }
 *
 * // Error response for unexpected error
 * Status: 500
 * Response Body: { "error": "Unexpected error was caught" }
 */

type RefreshTokenCallback = (token: OAuth[]) => Promise<void>;

const refreshTokenCallbacks: { [serviceId: number]: RefreshTokenCallback } = {
    1: async (tokens) => { 
        await refreshSpotifyTokens(tokens); 
    },
};

const refreshTokens = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userInfo : TokenData = (req as CustomRequest).user

    if (!userInfo) {
        res.status(401).json({error: "User not found"})
    }
    try {
        const { serviceId } = req.body

        if (!serviceId) {
            res.status(401).json({error: "Service not defined"})
        }

        const tokens : OAuth[] = await OAuth.findAll({
            where: {
                serviceId: serviceId,
            }
        });
        const refreshTokenCallback : RefreshTokenCallback = refreshTokenCallbacks[serviceId];

        if (!refreshTokenCallback) {
            res.status(401).json({error: "Unknow service"})
        }
        await refreshTokenCallback(tokens)
        next()
    } catch (error) {
        res.status(500).json({error: 'Unexpected error was caught'})
    }
}

export default refreshTokens;
