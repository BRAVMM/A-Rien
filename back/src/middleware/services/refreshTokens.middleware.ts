import { NextFunction, Request, Response } from "express";
import { TokenData } from "../../interfaces/token.interface";
import { CustomRequest } from "../../interfaces/request.interface";
import { OAuth } from "../../models/oauth.model";
import { EncryptionService } from "../../services/encryption.service";
import refreshSpotifyTokens from "./refreshCallback/spotifyRefresh.middleware";

/**
 * Type definition for a callback function used to refresh OAuth tokens.
 * This function takes an array of OAuth token objects and performs an asynchronous operation to refresh these tokens.
 *
 * @param {OAuth[]} tokens - An array of OAuth token objects to be refreshed.
 * @returns {Promise<void>} - A promise that resolves when the token refresh operation is complete.
 */
type RefreshTokenCallback = (tokens: OAuth[]) => Promise<void>;

/**
 * A map associating service IDs with their respective token refresh callback functions.
 * Each service ID is mapped to a `RefreshTokenCallback` function that contains the specific logic to refresh tokens for that service.
 * 
 * Currently implemented services:
 *  - Service ID 1: A callback for the Spotify service, implemented in the `refreshSpotifyTokens` function.
 * 
 * Additional services and their corresponding callback functions can be added to this map as needed.
 *
 * @example
 * // Example usage for refreshing tokens for a specific service
 * const serviceId = 1;
 * const tokens = await OAuth.findAll({ where: { serviceId }});
 * await refreshTokenCallbacks[serviceId](tokens);
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
const refreshTokenCallbacks: { [serviceId: number]: RefreshTokenCallback } = {
    1: async (tokens) => { 
        await refreshSpotifyTokens(tokens); 
    },
};

/**
 * Function that refreshes OAuth tokens for a specific service identified by the serviceId.
 * This function retrieves all OAuth tokens associated with the specified serviceId
 * and executes a callback function defined in `refreshTokenCallbacks` to refresh these tokens.
 * 
 * @param {number} serviceId - The ID of the service for which to refresh tokens.
 * @param {number} ownerId - The ID of the owner of the token.
 * 
 * @throws Throws an error if no callback is defined for the provided serviceId or if an unexpected error occurs during the token refresh process.
 *
 * @example
 * const serviceId = 1; // Service ID for Spotify
 * const ownerId = 1; // Owner of the token
 * await refreshTokensOfUserByServiceID(serviceId, ownerId);
 *
 */
const refreshTokensOfUserByServiceID = async (serviceId: number, ownerId: number /*temporary*/): Promise<void> => {
    const tokens : OAuth[] = await OAuth.findAll({
        where: {
            ownerId: ownerId,
            serviceId: serviceId,
        }
    });
    if (tokens.length == 0) {
        return;
    }
    const refreshTokenCallback : RefreshTokenCallback = refreshTokenCallbacks[serviceId];

    if (!refreshTokenCallback) {
        throw new Error('Service not found')
    }
    await refreshTokenCallback(tokens)
}

/**
 * Middleware that refreshes OAuth tokens for a service specified in the request body.
 * It checks for user authentication and the presence of a valid 'serviceId' in the request body.
 * Then, it invokes the `refreshTokensByServiceID` function to perform the token refresh.
 * 
 * @param {Request} req - The Express request object. It must contain 'serviceId' in the body and user info in the custom request property.
 * @param {Response} res - The Express response object used for sending error responses.
 * @param {NextFunction} next - The callback function to pass control to the next middleware.
 * 
 * @throws Will send a 401 (Unauthorized) response if the user is not found or if the 'serviceId' is not provided.
 * @throws Will send a 500 (Internal Server Error) response if an unexpected error occurs during the token refresh process.
 *
 * @example
 * POST /api/refreshTokens
 * Body: { "serviceId": 1 }
 * 
 * // Successful execution forwards control to the next middleware
 * 
 * // Error responses for missing user or serviceId
 * Status: 401
 * Response Body: { "error": "User not found" } or { "error": "Service not defined" }
 *
 * // Error response for unexpected error
 * Status: 500
 * Response Body: { "error": "Unexpected error was caught" }
 */
const refreshTokens = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userInfo : TokenData = (req as CustomRequest).user

    if (!userInfo) {
        res.status(404).json({error: "User not found"});
        return;
    }
    try {
        const { serviceId } = req.body

        if (!serviceId) {
            res.status(404).json({error: "Service not found"});
            return;
        }
        await refreshTokensOfUserByServiceID(serviceId, userInfo.userId)
        next()
    } catch (error) {
        if (error instanceof Error) {

        }
        console.error(error);
        res.status(500).json({error: 'Token refresh error'});
        return;
    }
}

export {refreshTokens, refreshTokensOfUserByServiceID};
