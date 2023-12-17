/**
 * Data of a verified and decoded token.
 */
interface TokenData {
    userId: number;
    iat: number;
    exp: number;
}

interface OAuthData {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    serviceId: number;
}

export {TokenData, OAuthData}
