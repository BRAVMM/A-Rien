/**
 * Data of a verified and decoded token.
 */
interface TokenData {
    userId: number;
    iat: number;
    exp: number;
}

/**
 * Data of the request for routes to register a new token.
 */
interface OAuthData {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    serviceId: number;
}

export {TokenData, OAuthData}
