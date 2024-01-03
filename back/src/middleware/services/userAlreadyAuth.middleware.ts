import { NextFunction, Request, Response } from "express";
import { TokenData } from "../../interfaces/token.interface";
import { CustomRequest } from "../../interfaces/request.interface";
import { OAuth } from "../../models/oauth.model";
import { EncryptionService } from "../../services/encryption.service";
import refreshSpotifyTokens from "./refreshCallback/spotifyRefresh.middleware";
import { spotifyAlreadyAuth } from "./Auth/spotifyAuth.middleware";

/**
 * Type definition for a callback function used to check if a user is already authenticated.
 * This function takes an array of OAuth tokens and a new access token as parameters
 * and performs a check to determine if the user associated with the new access token
 * is already authenticated.
 *
 * @param {OAuth[]} tokens - An array of OAuth token objects to check against.
 * @param {string} newToken - The new access token to check for existing authentication.
 * @returns {Promise<void>} - A promise that resolves when the check is complete.
 */
type CheckUserAlreadyAuth = (tokens: OAuth[], newToken: string) => Promise<void>;

/**
 * A map that associates service IDs with their respective callback functions for checking
 * if a user is already authenticated with that service. Each service ID key maps to a
 * CheckUserAlreadyAuth function that implements the specific logic for that service.
 * 
 * Currently implemented services:
 *  - Service ID 1: A callback for the Spotify service, invoking the spotifyAlreadyAuth function.
 * 
 * Example usage:
 *  const serviceId = 1;
 *  const tokens = await OAuth.findAll({ where: { serviceId }});
 *  const newAccessToken = "example_new_access_token";
 *  await userAlreadyAuthCallbacks[serviceId](tokens, newAccessToken);
 */
const userAlreadyAuthCallbacks: { [serviceId: number]: CheckUserAlreadyAuth } = {
    1: async (tokens, newToken) => { 
        await spotifyAlreadyAuth(tokens, newToken); 
    },
};

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
        const { serviceId, accessToken } = req.body

        if (!serviceId || !accessToken) {
            res.status(400).json({error: "Missing required parameters"});
            return;
        }
        const tokens : OAuth[] = await OAuth.findAll({
            where: {
                ownerId: userInfo.userId,
                serviceId: serviceId,
            }
        });
        const userAlreadyAuthCallback : CheckUserAlreadyAuth = userAlreadyAuthCallbacks[serviceId];

        if (!userAlreadyAuthCallback) {
            res.status(401).json({error: "Service undefined"});
            return;
        }
        await userAlreadyAuthCallback(tokens, accessToken);
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({error: "User already logged in"});
        return;
    }
}

export default userAlreadyAuth;
