/**
 * @fileOverview Spotify reactions services
 */

/* Services */
import {OAuthService} from "../../oauth.service";

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
        const oauthToken: string | null = await OAuthService.getDecryptedOAuthTokenFromId(oauthId, ownerId);

        if (oauthToken === null) {
            console.error("OAuth token not found");
            return false;
        }
        console.log(ownerId);
        console.log(oauthToken); // to remove when the OAuth is implemented
        console.log(actionData);
        console.log(reactionData);
        return true;
    }
}

export {SpotifyReactions};
