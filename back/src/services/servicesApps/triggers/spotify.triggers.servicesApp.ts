/**
 * @fileOverview Spotify Triggers ServicesApp
 */

import {OAuthService} from "../../oauth.service";

/**
 * @namespace SpotifyTriggers
 * @description Spotify Triggers ServicesApp
 */
namespace SpotifyTriggers {
    export const checkSpotifyNewSavedSong = async (ownerId: number, oauthId: number, data: JSON): Promise<boolean> => {
        try {
            const oauthToken: string | null = await OAuthService.getDecryptedOAuthTokenFromId(oauthId, ownerId);
            if (oauthToken === null) {
                console.error("OAuth token not found");
                return false;
            }
            const response: any = await fetch("https://api.spotify.com/v1/me/tracks", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + oauthToken
                }
            });
            const json: any = await response.json();
            console.log(json);
        } catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }

    /**
     * Check if a new album has been saved
     * @param ownerId - The owner id of the trigger
     * @param oauthId - The oauth id of the trigger
     * @param data - The data of the trigger
     * @returns {Promise<boolean>} - The result of the trigger
     */
    export const checkSpotifyNewSavedAlbum = async (ownerId: number, oauthId: number, data: JSON): Promise<boolean> => {
        try {
            const oauthToken: string | null = await OAuthService.getDecryptedOAuthTokenFromId(oauthId, ownerId);
            if (oauthToken === null) {
                console.error("OAuth token not found");
                return false;
            }
            const response: any = await fetch("https://api.spotify.com/v1/me/albums", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + oauthToken
                }
            });
            const json: any = await response.json();
            console.log(json);
        } catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }

    /**
     * Check if a new artist has been saved
     * @param ownerId - The owner id of the trigger
     * @param oauthId - The oauth id of the trigger
     * @param data - The data of the trigger
     * @returns {Promise<boolean>} - The result of the trigger
     */
    export const checkSpotifyNewSavedArtist = async (ownerId: number, oauthId: number, data: JSON): Promise<boolean> => {
        try {
            const oauthToken: string | null = await OAuthService.getDecryptedOAuthTokenFromId(oauthId, ownerId);
            if (oauthToken === null) {
                console.error("OAuth token not found");
                return false;
            }
            const response: any = await fetch("https://api.spotify.com/v1/me/following?type=artist", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + oauthToken
                }
            });
            const json: any = await response.json();
            console.log(json);
        } catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }

    /**
     * Check if a new playlist has been saved
     * @param ownerId - The owner id of the trigger
     * @param oauthId - The oauth id of the trigger
     * @param data - The data of the trigger
     * @returns {Promise<boolean>} - The result of the trigger
     */
    export const checkSpotifyNewSavedPlaylist = async (ownerId: number, oauthId: number, data: JSON): Promise<boolean> => {
        try {
            const oauthToken: string | null = await OAuthService.getDecryptedOAuthTokenFromId(oauthId, ownerId);
            if (oauthToken === null) {
                console.error("OAuth token not found");
                return false;
            }
            const response: any = await fetch("https://api.spotify.com/v1/me/playlists", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + oauthToken
                }
            });
            const json: any = await response.json();
            console.log(json);
        } catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }
}

export {SpotifyTriggers};
