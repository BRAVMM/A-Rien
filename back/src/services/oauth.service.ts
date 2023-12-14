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
    export const getDecryptedOAuthTokenFromId = async (oauthId: number, ownerId: number): Promise<string | null> => {
        const EncryptedOAuth: OAuth | null = await OAuthMiddleware.getOAuthFromId(oauthId, ownerId);

        if (EncryptedOAuth === null) {
            console.error("OAuth not found");
            return null;
        }
        return EncryptionService.decrypt(EncryptedOAuth.iv, EncryptedOAuth.encryptedOAuthToken);
    }
}

export {OAuthService};
