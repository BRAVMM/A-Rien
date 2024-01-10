/**
 * Async function to refresh a Microsoft authentication token.
 *
 * This function sends a request to Microsoft's OAuth 2.0 token endpoint to refresh the access token using the provided refresh token.
 * It requires the Microsoft Client ID, Client Secret, and Tenant ID to be set as environment variables.
 * The new access token is then returned.
 * 
 * @param {string} refreshToken - The refresh token used to obtain a new access token.
 * 
 * @returns {Promise<string>} A promise that resolves to the new access token.
 * 
 * @throws Will throw an error if the environment variables are not set, or if the Microsoft API request fails for any reason, such as network issues, invalid refresh token, or Microsoft API errors.
 * 
 * @example
 * // Example usage:
 * const newToken = await getRefreshedToken('your_refresh_token_here');
 * 
 * // On successful execution, 'newToken' will be the updated Microsoft access token.
 * // On failure, an error is thrown with the message "Spotify token refresh failed: [status]" or "Les variables d'environnement Microsoft ne sont pas définies".
 */
const getRefreshedToken = async (refreshToken: string): Promise<string> => {
    const MICROSOFT_CLIENT_ID = process.env.MICROSOFT_CLIENT_ID;
    const MICROSOFT_CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET;
    const TENANT_ID = process.env.MICROSOFT_CLIENT_TENANT_ID;

    if (!MICROSOFT_CLIENT_ID || !TENANT_ID) {
        console.error("Les variables d'environnement Microsoft ne sont pas définies")
        throw new Error("Les variables d'environnement Microsoft ne sont pas définies");
    }

    const tokenEndpoint = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;

    const params = new URLSearchParams({
        client_id: MICROSOFT_CLIENT_ID,
        scope: "openid profile offline_access email user.readwrite user.read mail.read mail.send chat.readwrite", // Ajoutez ou modifiez les scopes selon les besoins
        grant_type: 'refresh_token',
        refresh_token: refreshToken
    });

    try {
        const authHeader = 'Basic ' + Buffer.from(`${MICROSOFT_CLIENT_ID}:${MICROSOFT_CLIENT_SECRET}`).toString('base64');

        const microsoftResponse = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': authHeader,
                
            },
            body: params.toString(),
        });
        const data = await microsoftResponse.json()

        if (!microsoftResponse.ok) {
            console.log(data)
            throw new Error(`Spotify token refresh failed: ${microsoftResponse.status}`);
        }

        console.log(data)
        return data.access_token
    } catch (error) {
        throw error;
    }
}

export default getRefreshedToken
