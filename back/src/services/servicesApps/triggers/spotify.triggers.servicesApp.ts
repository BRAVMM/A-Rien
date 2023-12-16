/**
 * @fileOverview Spotify Triggers ServicesApp
 */

import {OAuthService} from "../../oauth.service";

/**
 * @constant {string} SPOTIFY_API_BASE_URL - The base URL of the Spotify API
 * @constant {Record<string, SpotifyTriggerData>} usersSpotifyTriggerData - The data of the Spotify triggers
 */
const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";
const usersSpotifyTriggerData: Record<string, SpotifyTriggerData> = {};

/**
 * @interface SpotifyTriggerData
 * @description The data of a Spotify trigger
 */
interface SpotifyTriggerData {
    userId: string;
    SoundLikedLength: number;
    AlbumLikedLength: number;
    ArtistLikedLength: number;
    PlaylistLikedLength: number;
}

/**
 * @namespace SpotifyTriggers
 * @description Spotify Triggers ServicesApp
 */
namespace SpotifyTriggers {
    async function fetchWithOAuth(oauthId: number, ownerId: number, url: string): Promise<any> {
        const oauthToken: string | null = await OAuthService.getDecryptedOAuthTokenFromId(oauthId, ownerId);
        if (oauthToken === null) {
            throw new Error("OAuth token not found");
        }
        const response: Response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + oauthToken,
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`Spotify API responded with status: ${response.status}`);
        }
        return response.json();
    }

    function getOrCreateUserData(ownerId: number): SpotifyTriggerData {
        const userId = ownerId.toString();
        if (!usersSpotifyTriggerData[userId]) {
            usersSpotifyTriggerData[userId] = {
                userId: userId,
                SoundLikedLength: 0,
                AlbumLikedLength: 0,
                ArtistLikedLength: 0,
                PlaylistLikedLength: 0
            };
        }
        return usersSpotifyTriggerData[userId];
    }

    export const checkSpotifyNewSavedSong = async (ownerId: number, oauthId: number, data: JSON): Promise<boolean> => {
        try {
            const json = await fetchWithOAuth(oauthId, ownerId, SPOTIFY_API_BASE_URL + "/me/tracks");
            const userData = getOrCreateUserData(ownerId);
            userData.SoundLikedLength = json.items.length;
            console.log(json);
        } catch (e) {
            console.error("Error in checkSpotifyNewSavedSong:", e);
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
            const json = await fetchWithOAuth(oauthId, ownerId, SPOTIFY_API_BASE_URL + "/me/albums");
            const userData = getOrCreateUserData(ownerId);
            userData.AlbumLikedLength = json.items.length;
            console.log(json);
        } catch (e) {
            console.error("Error in checkSpotifyNewSavedAlbum:", e);
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
            const json = await fetchWithOAuth(oauthId, ownerId, SPOTIFY_API_BASE_URL + "/me/following?type=artist");
            const userData = getOrCreateUserData(ownerId);
            userData.ArtistLikedLength = json.artists.items.length;
            console.log(json);
        } catch (e) {
            console.error("Error in checkSpotifyNewSavedArtist:", e);
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
            const json = await fetchWithOAuth(oauthId, ownerId, SPOTIFY_API_BASE_URL + "/me/playlists");
            const userData = getOrCreateUserData(ownerId);
            userData.PlaylistLikedLength = json.items.length;
            console.log(json);
        } catch (e) {
            console.error("Error in checkSpotifyNewSavedPlaylist:", e);
            return false;
        }
        return true;
    }
}

export {SpotifyTriggers};
