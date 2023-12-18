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
 * @namespace SpotifyTriggers
 * @description Spotify Triggers ServicesApp
 */
namespace SpotifyTriggers {
    /**
     * Get the length of the saved playlist
     * @private - The length of the saved playlist
     * @returns {Promise<number>} - The length of the saved playlist
     */
    async function getSpotifyEntityLength(oauthId: number, ownerId: number, url: string): Promise<{length: number, json: any}> {
        let offset = 0;
        let length = 0;
        let json: any;

        do {
            json = await fetchWithOAuth(oauthId, ownerId, SPOTIFY_API_BASE_URL + url + "?limit=50" + "&offset=" + offset);
            offset += 50;
            length += json.total;
        } while (json.total === 50);
        return {length, json};
    }

    /**
     * Fetch data from the Spotify API with OAuth
     * @param oauthId - The id of the OAuth
     * @param ownerId - The id of the owner
     * @param url - The url to fetch
     * @returns {Promise<any>} - The response of the fetch
     */
    async function fetchWithOAuth(oauthId: number, ownerId: number, url: string): Promise<any> {
        const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
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
        return await response.json();
    }

    /**
     * Get or create the data of a Spotify trigger
     * @param ownerId - The id of the owner
     * @returns {SpotifyTriggerData} - The data of the Spotify trigger
     */
    function getOrCreateUserData(ownerId: number): SpotifyTriggerData {
        const userId = ownerId.toString();
        if (!usersSpotifyTriggerData[userId]) {
            usersSpotifyTriggerData[userId] = {
                userId: userId,
                trackLikedLength: 0,
                albumLikedLength: 0,
                artistLikedLength: 0,
                playlistLikedLength: 0
            };
        }
        return usersSpotifyTriggerData[userId];
    }

    /**
     * Check if a new song has been saved
     * @param ownerId - The owner id of the trigger
     * @param oauthId - The oauth id of the trigger
     * @param data - The data of the trigger
     * @returns {Promise<boolean>} - The result of the trigger
     */
    export const checkSpotifyNewSavedSong = async (ownerId: number, oauthId: number): Promise<boolean> => {
        try {
            const {length} = await getSpotifyEntityLength(oauthId, ownerId, "/me/tracks");
            const userData = getOrCreateUserData(ownerId);
            if (userData.trackLikedLength < length) {
                userData.trackLikedLength = length;
            } else {
                return false;
            }
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
    export const checkSpotifyNewSavedAlbum = async (ownerId: number, oauthId: number): Promise<boolean> => {
        try {
            const {length} = await getSpotifyEntityLength(oauthId, ownerId, "/me/albums");
            const userData = getOrCreateUserData(ownerId);
            if (userData.albumLikedLength < length) {
                userData.albumLikedLength = length;
            } else {
                return false;
            }
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
    export const checkSpotifyNewSavedArtist = async (ownerId: number, oauthId: number, data: any): Promise<boolean> => {
        try {
            const {length, json} = await getSpotifyEntityLength(oauthId, ownerId, "/me/albums");
            const userData = getOrCreateUserData(ownerId);
            if (data.gender) {
                for (const artist of json.artists.items) {
                    if (artist.genres.includes(data.gender)) {
                        if (userData.artistLikedLength < length) {
                            userData.artistLikedLength = length;
                        } else {
                            return false;
                        }
                    }
                }
            }
            if (userData.artistLikedLength < length) {
                userData.artistLikedLength = length;
            } else {
                return false;
            }
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
     * @returns {Promise<boolean>} - The result of the trigger
     */
    export const checkSpotifyNewSavedPlaylist = async (ownerId: number, oauthId: number): Promise<boolean> => {
        try {
            const {length} = await getSpotifyEntityLength(oauthId, ownerId, "/me/playlists");
            const userData = getOrCreateUserData(ownerId);
            if (userData.playlistLikedLength < length) {
                userData.playlistLikedLength = length;
            } else {
                return false;
            }
        } catch (e) {
            console.error("Error in checkSpotifyNewSavedPlaylist:", e);
            return false;
        }
        return true;
    }
}

export {SpotifyTriggers};
