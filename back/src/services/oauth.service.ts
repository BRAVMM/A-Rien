/**
 * @fileoverview OAuth service
 * @namespace OAuthService
 */

/* Models */
import {OAuth} from "../models/oauth.model";

/* Middleware */
import {OAuthMiddleware} from "../middleware/oauth.middleware";

/* Services */
import {EncryptionService} from "./encryption.service";
import {refreshTokens, refreshTokensOfUserByServiceID} from "../middleware/services/refreshTokens.middleware";

/**
 * @namespace OAuthService
 * @description OAuth service
 */
namespace OAuthService {
    /**
     * Retrieves the decrypted access token from the specified OAuth ID and owner ID.
     * @param oauthId The ID of the OAuth.
     * @param ownerId The ID of the owner.
     * @returns The decrypted access token, or null if not found.
     * @throws Error if the access token is not found in the database.
     */
    export const getDecryptedAccessTokenFromId = async (oauthId: number, ownerId: number): Promise<string | null> => {
        const EncryptedOAuth: OAuth | null = await OAuthMiddleware.getOAuthFromId(oauthId, ownerId);

        if (EncryptedOAuth === null) {
            console.error("Access token not found");
            throw new Error("Access token not found in database [OAuthService.getDecryptedAccessTokenFromId]");
        }
        // check if the access token is expired
        const now = new Date();
        let expiresAt = EncryptedOAuth.updatedAt;
        expiresAt.setSeconds(expiresAt.getSeconds() + EncryptedOAuth.expiresIn);
        expiresAt.setMinutes(expiresAt.getMinutes() - 1);
        if (now > expiresAt) {
            console.error("Access token expired");
            await refreshTokensOfUserByServiceID(ownerId, EncryptedOAuth.serviceId);
        }
        return EncryptionService.decrypt(EncryptedOAuth.ivAccess, EncryptedOAuth.encryptedAccessToken);
    }

    /**
     * Retrieves the decrypted refresh token from the specified OAuth ID and owner ID.
     * @param oauthId The ID of the OAuth.
     * @param ownerId The ID of the owner.
     * @returns The decrypted refresh token, or null if not found.
     * @throws Error if the refresh token is not found in the database.
     */
    export const getDecryptedRefreshTokenFromId = async (oauthId: number, ownerId: number): Promise<string | null> => {
        const EncryptedOAuth: OAuth | null = await OAuthMiddleware.getOAuthFromId(oauthId, ownerId);

        if (EncryptedOAuth === null) {
            console.error("Refresh token not found");
            throw new Error("Refresh token not found in database [OAuthService.getDecryptedRefreshTokenFromId]");
        }
        return EncryptionService.decrypt(EncryptedOAuth.ivRefresh, EncryptedOAuth.encryptedRefreshToken);
    }

    /**
     * Retrieves the OAuth data from the specified OAuth ID and owner ID.
     * @param oauthId The ID of the OAuth.
     * @param ownerId The ID of the owner.
     * @returns The OAuth data, or null if not found.
     */
    export const getOAuthDataFromId = async (oauthId: number, ownerId: number): Promise<JSON | undefined> => {
        const oAuth = await OAuthMiddleware.getOAuthFromId(oauthId, ownerId);
        return oAuth?.datas;
    }
}

export {OAuthService};
