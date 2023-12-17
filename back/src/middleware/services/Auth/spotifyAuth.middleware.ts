import { NextFunction, Request, Response } from "express";
import { OAuthData } from "../../../interfaces/token.interface";
import { OAuth } from "../../../models/oauth.model";
import { EncryptionService } from "../../../services/encryption.service";

/**
 * Middleware that authenticates with Spotify using an authorization code.
 * This method requests access and refresh tokens from Spotify's API using the provided authorization code.
 * After successful authentication, it prepares OAuth data and passes it to the next middleware.
 * 
 * @param {Request} req - The Express request object, containing the authorization code in the body.
 * @param {Response} res - The Express response object used for sending responses in case of errors.
 * @param {NextFunction} next - The callback function to pass control to the next middleware.
 * 
 * @throws Will send a 500 (Internal Server Error) response if the authentication with Spotify fails or encounters any errors.
 *
 * @example
 * POST /api/spotifyAuth
 * Body: { "code": "authorization_code_from_spotify" }
 * 
 * // Successful response (No direct response, but forwards OAuthData to the next middleware)
 * 
 * // Error response
 * Status: 500
 * Response Body: { "error": "Unexpected error was caught" }
 */
const spotifyAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const SERVICE_ID = 1

    try {
        const code = req.body.code;
        const SPOTIFY_REDIRECT_URI : string = process.env.SPOTIFY_REDIRECT_URI ?? ''

        if (!code) {
            res.status(401).json({error: "Code not found in the request."})
        }
        const spotifyResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
            },
            body: new URLSearchParams({
                code: code,
                redirect_uri: SPOTIFY_REDIRECT_URI,
                grant_type: 'authorization_code'
            }).toString()
        });

        const data = await spotifyResponse.json();
        const oauthData: OAuthData = {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresIn: data.expires_in,
            serviceId: SERVICE_ID,
        }
        
        req.body = oauthData 
        next()
    } catch (err) {
        res.status(500).json({error: 'Unexpected error was caught.'})
    }
}

/**
 * Function to check if a new user (identified by a new access token) is already authenticated.
 * It compares the email associated with the new access token against the emails associated with existing access tokens.
 * 
 * @param {OAuth[]} tokens - Array of existing OAuth token objects to be compared against. Each object must contain an encrypted access token and its associated IV (Initialization Vector).
 * @param {string} newToken - The new Spotify access token to check for existing authentication.
 * 
 * @throws Will throw an error if it fails to fetch user data for the new token or if the new user is already logged in.
 * 
 * @example
 * // Assuming 'tokens' is an array of OAuth objects from your database and 'newToken' is a freshly obtained Spotify access token
 * await spotifyAlreadyAuth(tokens, newToken);
 * 
 * // If a user with the same email as the new token is found in the existing tokens, an error "User already logged in" is thrown.
 */
const spotifyAlreadyAuth = async (tokens: OAuth[], newToken: string): Promise<void> => {
    var newUserEmail: string = ''

    try {
        const newUserReponse = await fetch('https://api.spotify.com/v1/me', {
            headers: { 'Authorization': `Bearer ${newToken}` }
        });
        const newUserData = await newUserReponse.json();

        newUserEmail = newUserData.email
    } catch (error) {
        throw new Error('Failed to fetch new user')
    }

    try {
        for (const token of tokens) {
            const accessToken = EncryptionService.decrypt(token.ivAccess, token.encryptedAccessToken);
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });

            const userData = await response.json();
            const userEmail = userData.email;

            if (newUserEmail === userEmail) {
                throw new Error('User already logged in')
            }
        }
    } catch (error) {
        throw new Error('User already logged in')
    }
}

export { spotifyAuth, spotifyAlreadyAuth };
