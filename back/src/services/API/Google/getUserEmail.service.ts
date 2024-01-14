import { GoogleUserInfo } from "../../../interfaces/googleInfo.interface";

const getGoogleUserInfo = async (token: string): Promise<GoogleUserInfo> => {
    if (!token || token.length === 0) {
        throw new Error('Invalid token to get user email')
    }
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!userResponse.ok) {
        throw new Error(`Google API request failed with status: ${userResponse.status}`);
    }
    const userData = await userResponse.json()
    const googleInfo: GoogleUserInfo = {
        name: userData.name,
        email: userData.email,
        givenName: userData.given_name,
        familyName: userData.family_name,
    }
    return googleInfo
}

export { getGoogleUserInfo }