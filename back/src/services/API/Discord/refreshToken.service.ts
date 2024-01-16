/**
 * Asynchronously refreshes a Discord access token using a provided refresh token.
 * Sends a POST request to Discord's token endpoint to obtain a new access token.
 *
 * @param {string} refreshToken - The refresh token used to obtain a new access token from Discord.
 * @returns {Promise<{access: string, refresh: string}>} - A promise that resolves to the new access and refresh token.
 *
 * @throws Will throw an error if the request to Discord's API fails, if the response status is not OK, 
 *         or if the response cannot be parsed as JSON.
 * 
 */
const getRefreshedToken = async (refreshToken: string): Promise<string> => {
    try {
        if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET) {
            throw new Error('Discord client ID or secret is undefined');
        }
        if (!process.env.DISCORD_API_ENDPOINT) {
            throw new Error('Discord API endpoint is undefined');
        }
        const discordResponse = await fetch(`${process.env.DISCORD_API_ENDPOINT}/oauth2/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_SECRET}`).toString('base64')
            },
            body: new URLSearchParams({
                refresh_token: refreshToken,
                grant_type: 'refresh_token',
            }).toString()
        });

        if (!discordResponse.ok) {
            throw new Error(`Discord token refresh failed: ${discordResponse.status}`);
        }

        const data = await discordResponse.json()

        return data.access_token

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default getRefreshedToken
