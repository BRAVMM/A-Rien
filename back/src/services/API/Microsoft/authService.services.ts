import { OAuthData } from "../../../interfaces/token.interface";

const getRedirectUri = (mobile: boolean) : string | undefined => {
    return mobile ? process.env.MICROSOFT_REDIRECT_URI_MOBILE : process.env.MICROSOFT_REDIRECT_URI_WEB
}

const authenticateUser = async (code: string, mobile: boolean): Promise<OAuthData> => {
    const MICROSOFT_CLIENT_ID = process.env.MICROSOFT_CLIENT_ID;
    const MICROSOFT_CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET;
    const MICROSOFT_REDIRECT_URI = getRedirectUri(mobile);
    const TENANT_ID = process.env.MICROSOFT_CLIENT_TENANT_ID;

    if (!MICROSOFT_CLIENT_ID || !MICROSOFT_REDIRECT_URI || !TENANT_ID) {
        console.error("Les variables d'environnement Microsoft ne sont pas définies")
        throw new Error("Les variables d'environnement Microsoft ne sont pas définies");
    }

    const tokenEndpoint = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;

    const params = new URLSearchParams({
        client_id: MICROSOFT_CLIENT_ID,
        scope: 'openid email profile user.read', // Ajoutez ou modifiez les scopes selon les besoins
        code: code,
        redirect_uri: MICROSOFT_REDIRECT_URI,
        grant_type: 'authorization_code',
    });

    try {
        const authHeader = !mobile ? 'Basic ' + Buffer.from(`${MICROSOFT_CLIENT_ID}:${MICROSOFT_CLIENT_SECRET}`).toString('base64') : '';

        const microsoftResponse = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': authHeader,
            },
            body: params.toString(),
        });

        const data = await microsoftResponse.json();
        if (!microsoftResponse.ok) {
            console.error({errorMessage: "\x1b[31mAn error was caught\x1b[0m"} , data)
            throw new Error("Microsoft API error");
        }
        const oauthData: OAuthData = {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresIn: data.expires_in,
            serviceId: 10, // TODO: replace by correct services ID's
        }
        console.log("\x1b[32mUser successfully connected to microsoft, access token = \x1b[0m", oauthData.accessToken)
        return oauthData
    } catch (error) {
        throw error;
    }
}

export default authenticateUser 
