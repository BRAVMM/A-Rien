import { OAuthData } from "../../../interfaces/token.interface";

const getRedirectUri = (mobile: boolean) : string | undefined => {
    return mobile ? process.env.GOOGLE_REDIRECT_URI_MOBILE : process.env.GOOGLE_REDIRECT_URI_WEB
}

/**
 * Asynchronously authenticates a user with the Spotify API using an authorization code.
 * This function sends a POST request to Spotify's token endpoint to exchange the authorization code
 * for an access token, refresh token, and token expiry time. It returns this information
 * packaged as an `OAuthData` object.
 * 
 * @param {string} code - The authorization code obtained from Spotify after user authorization.
 * @returns {Promise<OAuthData>} - A promise that resolves to an `OAuthData` object containing the access token, refresh token, and expiry time.
 * 
 * @throws Will throw an error if the request to Spotify's API fails or if the response cannot be parsed as JSON.
 */
const authenticateUser  = async (code: string, mobile: boolean): Promise<OAuthData> => {
    if (!process.env.GOOGLE_REDIRECT_URI_WEB || !process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REDIRECT_URI_MOBILE || !process.env.GOOGLE_SERVICE_ID) {
        console.error("error : Bad env configuration")
        throw new Error ("Bad env configuration")
    }
    const GOOGLE_SERVICE_ID : number = Number(process.env.GOOGLE_SERVICE_ID)
    const GOOGLE_REDIRECT_URI : string = getRedirectUri(mobile) ?? ''

    try {
        const googleResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(process.env.GOOGLE_CLIENT_ID + ':' + process.env.GOOGLE_CLIENT_SECRET).toString('base64')
            },
            body: new URLSearchParams({
                code: code,
                redirect_uri: GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code'
            }).toString()
        });
        const data = await googleResponse.json();
        if (!googleResponse.ok) {
            console.error({errorMessage: "An error was caught ", error: data})
            throw new Error('Failed to authenticate with Google');
        }
        const oauthData: OAuthData = {
            accessToken: data.access_token,
            refreshToken: "",
            expiresIn: data.expires_in,
            serviceId: GOOGLE_SERVICE_ID,
        }
        console.log("\x1b[32mUser successfully connected to google, access token = \x1b[0m", oauthData.accessToken)
        return oauthData
    } catch (error) {
        console.error("\x1b[31mAn error was caught in authenticateUser of Google\x1b[0m", error)
        throw error;
    }
}

export { authenticateUser }
