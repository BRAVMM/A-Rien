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
            const oauthToken: string | null = await OAuthService.getDecryptedOAuthTokenFromId(oauthId, ownerId);
            if (oauthToken === null) {
                console.error("OAuth token not found");
                return false;
            }
            const actionDataParsed: any = JSON.parse(JSON.stringify(actionData));
            const reactionDataParsed: any = JSON.parse(JSON.stringify(reactionData));
            const response: any = await fetch("https://api.spotify.com/v1/users/" + actionDataParsed.userId + "/playlists/" + reactionDataParsed.playlistId + "/tracks?uris=" + actionDataParsed.trackUri, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + oauthToken
                }
            });
            const json: any = await response.json();
            console.log(json);
        } catch (e) {
            console.error(e);
        }
        return true;
    }
}

export {SpotifyReactions};
