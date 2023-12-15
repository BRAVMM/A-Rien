/**
 * Data of a verified and decoded token.
 */
interface TokenData {
    userId: number;
    iat: number;
    exp: number;
}

export {TokenData}
