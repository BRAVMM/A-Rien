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
        try {
            const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
            if (oauthToken === null) {
                console.error("OAuth token not found");
                return false;
            }
            const actionDataParsed: any = actionData;
            const reactionDataParsed: any = reactionData;
            if (!actionDataParsed.userId || !actionDataParsed.trackUri || !reactionDataParsed.playlistId) {
                console.error("Missing data in reactionSpotifyAddToPlaylist");
                return false;
            }
            const response = await fetch("https://api.spotify.com/v1/users/" + actionDataParsed.userId + "/playlists/" + reactionDataParsed.playlistId + "/tracks?uris=" + actionDataParsed.trackUri, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + oauthToken
                }
            });
            const json = await response.json();
            console.log(json);
        } catch (e) {
            console.error("Error in reactionSpotifyAddToPlaylist:", e);
            return false;
        }
        return true;
    }
}

export {SpotifyReactions};
