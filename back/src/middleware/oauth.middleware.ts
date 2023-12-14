/**
 * @fileoverview OAuth middleware
 */

/* Models */
import {OAuth} from '../models/oauth.model';

/**
 * @namespace OAuthMiddleware
 * @description OAuth middleware
 */
namespace OAuthMiddleware {
    /**
     * Get an OAuth from an id
     * @param oauthId - The id of the OAuth
     * @param ownerId - The id of the owner
     * @returns {Promise<OAuth | null>}
     */
    export const getOAuthFromId = async (oauthId: number, ownerId: number): Promise<OAuth | null> => {
        try {
            return await OAuth.findOne(
                {
                    where: {
                        id: oauthId,
                        ownerId: ownerId
                    }
                }
            );
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export {OAuthMiddleware};
