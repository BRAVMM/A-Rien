import { OAuthData } from "../../../interfaces/token.interface";

const getRedirectUri = (mobile: boolean) : string | undefined => {
    return mobile ? process.env.SPOTIFY_REDIRECT_URI_MOBILE : process.env.SPOTIFY_REDIRECT_URI_WEB
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
    console.log(mobile)
    if (!process.env.SPOTIFY_REDIRECT_URI_WEB && !process.env.SPOTIFY_CLIENT_ID && !process.env.SPOTIFY_REDIRECT_URI_MOBILE && !process.env.SPOTIFY_SERVICE_ID) {
        throw new Error ("Bad env configuration")
    }
    const SPOTIFY_SERVICE_ID : number = Number(process.env.SPOTIFY_SERVICE_ID)
    const SPOTIFY_REDIRECT_URI : string = getRedirectUri(mobile) ?? ''

    try {
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
        console.log(data)
        const oauthData: OAuthData = {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresIn: data.expires_in,
            serviceId: SPOTIFY_SERVICE_ID,
        }
        console.log(oauthData)
        return oauthData
    } catch (error) {
        throw error;
    }
}

export default authenticateUser 
