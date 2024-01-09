import { OAuthData } from "../../../interfaces/token.interface";

/**
 * Asynchronously authenticates a user with the Discord API using an authorization code.
 * This function sends a POST request to Discord's token endpoint to exchange the authorization code
 * for an access token, refresh token, and token expiry time. It returns this information
 * packaged as an `OAuthData` object.
 * 
 * @param {string} code - The authorization code obtained from Discord after user authorization.
 * @returns {Promise<OAuthData>} - A promise that resolves to an `OAuthData` object containing the access token, refresh token, and expiry time.
 * 
 * @throws Will throw an error if the request to Discord's API fails or if the response cannot be parsed as JSON.
 */
const authenticateUser = async (code: string): Promise<OAuthData> => {
    const DISCORD_REDIRECT_URI : string = process.env.DISCORD_REDIRECT_URI ?? '';

    if (!process.env.DISCORD_REDIRECT_URI || !process.env.DISCORD_CLIENT_ID || DISCORD_REDIRECT_URI.length === 0 || !process.env.DISCORD_SERVICE_ID || !process.env.DISCORD_API_ENDPOINT) {
        console.error("error : Bad env configuration");
        throw new Error ("Bad env configuration");
    }
    const DISCORD_SERVICE_ID : number = Number(process.env.DISCORD_SERVICE_ID)
    try {
        const discordResponse = await fetch(`${process.env.DISCORD_API_ENDPOINT}/oauth2/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(process.env.DISCORD_CLIENT_ID + ':' + process.env.DISCORD_CLIENT_SECRET).toString('base64')
            },
            body: new URLSearchParams({
                code: code,
                redirect_uri: DISCORD_REDIRECT_URI,
                grant_type: 'authorization_code'
            }).toString()
        });
        const data = await discordResponse.json();
        if (!discordResponse.ok || !data.access_token || !data.refresh_token || !data.expires_in) {
            console.error("authenticateUser : Failed to authenticate with Discord");
            throw new Error('Failed to authenticate with Discord');
        }
        const oauthData: OAuthData = {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresIn: data.expires_in,
            serviceId: DISCORD_SERVICE_ID,
        }
        return oauthData
    } catch (error) {
        throw error;
    }
}

export default authenticateUser
