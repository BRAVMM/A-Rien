/**
 * @fileOverview Spotify reactions services
 */

/* Services */
import {OAuthService} from "../../oauth.service";

/* API Action Reaction Services Apps */
import {TRIGGER_DATA_TYPE} from "../APIActionReaction.servicesApps";

/**
 * @namespace SpotifyReactions
 * @description Spotify reactions services
 */
namespace SpotifyReactions {
    /**
     * Get first song uri of a playlist
     */
    const getFirstSongUriOfPlaylist = async (oauthId: number, ownerId: number, playlistId: string): Promise<string> => {
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
            if (!json || json.items[0] === undefined || json.items[0].track === undefined || json.items[0].track.uri === undefined)
                return "";
            return json.items[0].track.uri;
        } catch (e) {
            console.error("Error in getFirstSongUriOfPlaylist:", e);
            return "";
        }
    }

    /**
     * Get a random char
     * @returns {string} - The random char
     */
    const rand = (): string => {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        return chars.charAt(Math.floor(Math.random() * chars.length));
    }

    /**
     * Get a random number from an interval
     * @param min - The min number
     * @param max - The max number
     */
    const randFromInterval = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Get a random song uri
     * @param oauthId - The id of the OAuth
     * @param ownerId - The id of the owner
     */
    async function getRandomSongUri(oauthId: number, ownerId: number): Promise<string> {
        try {
            const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
            if (oauthToken === null) {
                console.error("OAuth token not found");
                return Promise.resolve("");
            }
            const response = await fetch("https://api.spotify.com/v1/search?q=" + rand() + "&type=track&limit=50" + "&offset=" + randFromInterval(0, 1000), {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + oauthToken
                }
            });
            const json = await response.json();
            return json.tracks.items[randFromInterval(0, 50)].uri;
        } catch (e) {
            console.error("Error in getRandomSongUri:", e);
            return Promise.resolve("");
        }
    }

    const getFirstSongUriOfAlbum = async (oauthId: number, ownerId: number, albumId: string): Promise<string> => {
        try {
            const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
            if (oauthToken === null) {
                console.error("OAuth token not found");
                return "";
            }
            const response = await fetch("https://api.spotify.com/v1/albums/" + albumId + "/tracks?limit=1", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + oauthToken
                }
            });
            const json = await response.json();
            console.log(json);
            if (!json || json.items[0] === undefined || json.items[0].uri === undefined)
                return "";
            return json.items[0].uri;
        } catch (e) {
            console.error("Error in getFirstSongUriOfAlbum:", e);
            return "";
        }
    }

    const getFirstSongUriOfArtist = async (oauthId: number, ownerId: number, artistId: string): Promise<string> => {
        try {
            const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
            if (oauthToken === null) {
                console.error("OAuth token not found");
                return "";
            }
            const response = await fetch("https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?country=FR", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + oauthToken
                }
            });
            const json = await response.json();
            console.log(json);
            if (!json || json.tracks[0] === undefined || json.tracks[0].uri === undefined)
                return "";
            return json.tracks[0].uri;
        } catch (e) {
            console.error("Error in getFirstSongUriOfArtist:", e);
            return "";
        }
    }

    const getDataTrackId = async (oauthId: number, ownerId: number, data: any): Promise<string> => {
        if (data.dataType === TRIGGER_DATA_TYPE.SPOTIFY_TRACK) {
            return data.trackUri;
        }
        if (data.dataType === TRIGGER_DATA_TYPE.SPOTIFY_ALBUM) {
            return await getFirstSongUriOfAlbum(oauthId, ownerId, data.albumId);
        }
        if (data.dataType === TRIGGER_DATA_TYPE.SPOTIFY_ARTIST) {
            return await getFirstSongUriOfArtist(oauthId, ownerId, data.artistId);
        }
        if (data.dataType === TRIGGER_DATA_TYPE.SPOTIFY_PLAYLIST) {
            return await getFirstSongUriOfPlaylist(oauthId, ownerId, data.playlistId);
        }
        return "";
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
            const trackUri: string = await getDataTrackId(oauthId, ownerId, actionDataParsed);
            const playlistId: string = reactionDataParsed[0].playlistId;
            if (!trackUri || !playlistId) {
                return false;
            }
            const response = await fetch("https://api.spotify.com/v1/playlists/" + playlistId + "/tracks", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + oauthToken
                },
                body: JSON.stringify({
                    uris: [trackUri]
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

    /**
     * Add a random song to a playlist
     * @param ownerId - The id of the owner
     * @param oauthId - The id of the OAuth
     * @param actionData - The action data
     * @param reactionData - The reaction data
     * @returns {Promise<boolean>} - The result of the reaction
     */
    export const reactionSpotifyAddRandomToPlaylist = async (ownerId: number, oauthId: number, actionData: JSON, reactionData: JSON): Promise<boolean> => {
        try {
            const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
            if (oauthToken === null) {
                console.error("OAuth token not found");
                return false;
            }
            const reactionDataParsed: any = JSON.parse(reactionData.toString());
            const playlistId: string = reactionDataParsed[0].playlistId;
            const trackUri: string = await getRandomSongUri(oauthId, ownerId);
            if (!playlistId) {
                return false;
            }
            const response = await fetch("https://api.spotify.com/v1/playlists/" + playlistId + "/tracks", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + oauthToken
                },
                body: JSON.stringify({
                    uris: [trackUri]
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
