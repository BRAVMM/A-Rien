import { NextFunction, Request, Response } from "express";
import { OAuthData } from "../../../interfaces/token.interface";
import { OAuth } from "../../../models/oauth.model";
import { EncryptionService } from "../../../services/encryption.service";
import { authenticateUserMicrosoft } from "../../../services/API/Spotify/authService.service";
// import getUserEmail from "../../../services/API/microsoft/getUserEmail.service";

/**
 * Middleware that authenticates with microsoft using an authorization code.
 * This method requests access and refresh tokens from microsoft's API using the provided authorization code.
 * After successful authentication, it prepares OAuth data and passes it to the next middleware.
 * 
 * @param {Request} req - The Express request object, containing the authorization code in the body.
 * @param {Response} res - The Express response object used for sending responses in case of errors.
 * @param {NextFunction} next - The callback function to pass control to the next middleware.
 * 
 * @throws Will send a 500 (Internal Server Error) response if the authentication with microsoft fails or encounters any errors.
 *
 * @example
 * POST /api/microsoftAuth
 * Body: { "code": "authorization_code_from_microsoft" }
 * 
 * // Successful response (No direct response, but forwards OAuthData to the next middleware)
 * 
 * // Error response
 * Status: 500
 * Response Body: { "error": "Unexpected error was caught" }
 */
const microsoftAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        throw Error("oui") 
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'microsoft authentication failed.'})
        return;
    }
}

/**
 * Function to check if a new user (identified by a new access token) is already authenticated.
 * It compares the email associated with the new access token against the emails associated with existing access tokens.
 * 
 * @param {OAuth[]} tokens - Array of existing OAuth token objects to be compared against. Each object must contain an encrypted access token and its associated IV (Initialization Vector).
 * @param {string} newToken - The new microsoft access token to check for existing authentication.
 * 
 * @throws Will throw an error if it fails to fetch user data for the new token or if the new user is already logged in.
 * 
 * @example
 * // Assuming 'tokens' is an array of OAuth objects from your database and 'newToken' is a freshly obtained microsoft access token
 * await microsoftAlreadyAuth(tokens, newToken);
 * 
 * // If a user with the same email as the new token is found in the existing tokens, an error "User already logged in" is thrown.
 */
const microsoftAlreadyAuth = async (tokens: OAuth[], newToken: string): Promise<void> => {

}

export { microsoftAuth, microsoftAlreadyAuth };
