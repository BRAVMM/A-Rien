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
     * Get first song uri of a playlist
     */
    export const getFirstSongUriOfPlaylist = async (oauthId: number, ownerId: number, playlistId: string): Promise<string> => {
        try {
            const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
            if (oauthToken === null) {
                console.error("OAuth token not found");
                return "";
            }
            const response = await fetch("https://api.spotify.com/v1/playlists/" + playlistId + "/tracks?limit=1", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + oauthToken
                }
            });
            const json = await response.json();
            console.log(json);
            return json.items[0].track.uri;
        } catch (e) {
            console.error("Error in getFirstSongUriOfPlaylist:", e);
            return "";
        }
    }

    /**
     * Add a song to a playlist
     * @param ownerId - The id of the owner
     * @param oauthId - The id of the OAuth
     * @param actionData - The action data
     * @param reactionData - The reaction data
     * @returns {Promise<boolean>} - The result of the reaction
     */
    export const reactionSpotifyAddToPlaylistFromASong = async (ownerId: number, oauthId: number, actionData: JSON, reactionData: JSON): Promise<boolean> => {
        try {
            const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
            if (oauthToken === null) {
                console.error("OAuth token not found");
                return false;
            }
            const actionDataParsed: any = actionData;
            const reactionDataParsed: any = JSON.parse(reactionData.toString());
            if (actionDataParsed.playlistUri) {
                const id = actionDataParsed.playlistUri.split(":")[2];
                actionDataParsed.trackUri = await getFirstSongUriOfPlaylist(oauthId, ownerId, id);
            }
            if (!actionDataParsed.trackUri || !reactionDataParsed[0].playlistId) {
                console.log("actionDataParsed = ", actionDataParsed);
                console.log("reactionDataParsed[0] = ", reactionDataParsed[0]);
                console.log("reactionDataParsed = ", reactionDataParsed);
                console.log("actionDataParsed.trackUri : " + actionDataParsed.trackUri);
                console.log("playlistId : " + reactionDataParsed[0].playlistId);
                console.error("Missing data in reactionSpotifyAddToPlaylist");
                return false;
            }
            const response = await fetch("https://api.spotify.com/v1/playlists/" + reactionDataParsed[0].playlistId + "/tracks", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + oauthToken
                },
                body: JSON.stringify({
                    uris: [actionDataParsed.trackUri]
                })
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
