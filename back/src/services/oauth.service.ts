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

/**
 * @namespace OAuthService
 * @description OAuth service
 */
namespace OAuthService {
    export const getDecryptedAccessTokenFromId = async (oauthId: number, ownerId: number): Promise<string | null> => {
        const EncryptedOAuth: OAuth | null = await OAuthMiddleware.getOAuthFromId(oauthId, ownerId);

        if (EncryptedOAuth === null) {
            console.error("OAuth not found");
            throw new Error("OAuth not found in database [OAuthService.getDecryptedOAuthTokenFromId]");
        }
        return EncryptionService.decrypt(EncryptedOAuth.ivAccess, EncryptedOAuth.encryptedAccessToken);
    }

    export const getDecryptedRefreshTokenFromId = async (oauthId: number, ownerId: number): Promise<string | null> => {
        const EncryptedOAuth: OAuth | null = await OAuthMiddleware.getOAuthFromId(oauthId, ownerId);

        if (EncryptedOAuth === null) {
            console.error("OAuth not found");
            throw new Error("OAuth not found in database [OAuthService.getDecryptedOAuthTokenFromId]");
        }
        return EncryptionService.decrypt(EncryptedOAuth.ivRefresh, EncryptedOAuth.encryptedRefreshToken);
    }
}

export {OAuthService};
