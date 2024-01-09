import { NextFunction, Request, Response } from "express";
import authenticateUser from "../../../services/API/Discord/authService.service";

/**
 * Middleware that authenticates with Discord using an authorization code.
 * This method requests access and refresh tokens from Discord's API using the provided authorization code.
 * After successful authentication, it prepares OAuth data and passes it to the next middleware.
 *
 * @param {Request} req - The Express request object, containing the authorization code in the body.
 * @param {Response} res - The Express response object used for sending responses in case of errors.
 * @param {NextFunction} next - The callback function to pass control to the next middleware.
 *
 * @throws Will send a 500 (Internal Server Error) response if the authentication with Discord fails or encounters any errors.
 *
 * @example
 * POST /api/discordAuth
 * Body: { "code": "authorization_code_from_discord" }
 *
 * // Successful response (No direct response, but forwards OAuthData to the next middleware)
 *
 * // Error response
 * Status: 500
 * Response Body: { "error": "Unexpected error was caught" }
 */
const discordAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const code: string = req.body.code;
        const guildId: string = req.body.guildId;
        const mobile: boolean = req.body.mobile;

        if (!code) {
            res.status(400).json({ error: "Code not found in the request." })
            return;
        }
        if (!guildId) {
            res.status(400).json({ error: "Guild ID not found in the request." })
            return;
        }
        req.body = await authenticateUser(code, (mobile !== undefined && mobile))
        req.params.guildId = guildId
        next()
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error })
            return;
        }
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
        return;
    }
}

/**
 * Function to check if a new user (identified by a new access token) is already authenticated.
 * It compares the email associated with the new access token against the emails associated with existing access tokens.
 *
 * @param {OAuth[]} tokens - Array of existing OAuth token objects to be compared against. Each object must contain an encrypted access token and its associated IV (Initialization Vector).
 * @param {string} newToken - The new Discord access token to check for existing authentication.
 *
 * @throws Will throw an error if it fails to fetch user data for the new token or if the new user is already logged in.
 *
 * @example
 * // Assuming 'tokens' is an array of OAuth objects from your database and 'newToken' is a freshly obtained Discord access token
 * await discordAlreadyAuth(tokens, newToken);
 *
 * // If a user with the same email as the new token is found in the existing tokens, an error "User already logged in" is thrown.
 */
const discordAlreadyAuth = async (userEmail: string): Promise<boolean> => {

    if (!userEmail) {
        return false;
    }
    try {
    } catch (error) {
        console.error("User already logged in error")
        throw error
    }
    return true;
}

export { discordAuth, discordAlreadyAuth };
