import { OAuthData } from "../../../interfaces/token.interface";

/**
 * Retrieves the redirect URI based on the mobile flag.
 *
 * @param {boolean} mobile - A flag indicating whether the redirect URI is for mobile or web.
 * @returns {string | undefined} - The redirect URI for the specified platform, or undefined if not found.
 */
const getRedirectUri = (mobile: boolean): string | undefined => {
    return mobile ? process.env.DISCORD_REDIRECT_URI_MOBILE : process.env.DISCORD_REDIRECT_URI_WEB
}

/**
 * Asynchronously authenticates a user with the Discord API using an authorization code.
 * This function sends a POST request to Discord's token endpoint to exchange the authorization code
 * for an access token, refresh token, and token expiry time. It returns this information
 * packaged as an `OAuthData` object.
 *
 * @param {string} code - The authorization code obtained from Discord after user authorization.
 * @returns {Promise<OAuthData>} - A promise that resolves to an `OAuthData` object containing the access token, refresh token, and expiry time.
 * @throws {Error} - Throws an error if the request to Discord's API fails or if the response cannot be parsed as JSON.
 */
const authenticateUserDiscord = async (code: string, mobile: boolean): Promise<{oauthData: OAuthData, webhookId: string, token: string, url: string}> => {
    if (!process.env.DISCORD_REDIRECT_URI_WEB || !process.env.DISCORD_REDIRECT_URI_MOBILE || !process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_SERVICE_ID || !process.env.DISCORD_API_ENDPOINT) {
        console.error("error : Bad env configuration");
        throw new Error("Bad env configuration");
    }
    const DISCORD_SERVICE_ID: number = Number(process.env.DISCORD_SERVICE_ID)
    const DISCORD_REDIRECT_URI: string = getRedirectUri(mobile) ?? '127.0.0.1';
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
        if (!discordResponse.ok || !data.access_token || !data.refresh_token || !data.expires_in || !data.webhook.id || !data.webhook.token || !data.webhook.url) {
            console.error("authenticateUser : Failed to authenticate with Discord", data.error, data.error_description);
            throw new Error('Failed to authenticate with Discord');
        }
        const oauthData: OAuthData = {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresIn: data.expires_in,
            serviceId: DISCORD_SERVICE_ID,
        }
        console.log("\x1b[32mUser successfully connected to discord, access token = \x1b[0m", oauthData.accessToken)
        return {oauthData, webhookId: data.webhook.id, token: data.webhook.token, url: data.webhook.url}
    } catch (error) {
        console.error("\x1b[31mAn error was caught in authenticateUserDiscord\x1b[0m", error)
        throw error;
    }
}

export default authenticateUserDiscord
