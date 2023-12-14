/**
 * @fileOverview Spotify reactions services
 */

/* Models */
import {OAuth} from "../../../models/oauth.model";

/* Middleware */
import {OAuthMiddleware} from "../../../middleware/oauth.middleware";

/**
 * @namespace SpotifyReactions
 * @description Spotify reactions services
 */
namespace SpotifyReactions {
    /**
     * Add a song to a playlist
     * @param ownerId - The id of the owner
     * @param oauthId - The id of the OAuth
     * @param actionData - The action data
     * @param reactionData - The reaction data
     * @returns {Promise<boolean>} - The result of the reaction
     */
    export const reactionSpotifyAddToPlaylist = async (ownerId: number, oauthId: number, actionData: JSON, reactionData: JSON): Promise<boolean> => {
        const oauth: OAuth | null = await OAuthMiddleware.getOAuthFromId(oauthId, ownerId);

        if (oauth === null) {
            console.error("OAuth not found");
            return false;
        }
        console.log(ownerId);
        console.log(oauth.oauthToken); // to remove when the OAuth is implemented
        console.log(actionData);
        console.log(reactionData);
        return true;
    }
}

export {SpotifyReactions};
