/**
 * @fileOverview Spotify Triggers ServicesApp
 */

import {OAuthService} from "../../oauth.service";

import {TRIGGER_DATA_TYPE} from "../APIActionReaction.servicesApps";

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
    async function getSpotifyEntityLength(oauthId: number, ownerId: number, url: string): Promise<{
        length: number,
        json: any
    }> {
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

    async function getSpotifyTrackInfos(oauthId: number, ownerId: number, trackId: string): Promise<{
        trackInfos: any
    }> {
        let trackInfos: any;

        trackInfos = await fetchWithOAuth(oauthId, ownerId, SPOTIFY_API_BASE_URL + "/tracks/" + trackId);
        return {trackInfos};
    }

    async function getSpotifyArtistInfos(oauthId: number, ownerId: number, artistId: string): Promise<{
        artistInfos: any
    }> {
        let artistInfos: any;

        artistInfos = await fetchWithOAuth(oauthId, ownerId, SPOTIFY_API_BASE_URL + "/artists/" + artistId);
        return {artistInfos};
    }

    async function getSpotifyArtistsGenres(oauthId: number, ownerId: number, artists: any): Promise<{
        genres: string[]
    }> {
        let genres: string[] = [];

        for (const artist of artists) {
            const {artistInfos} = await getSpotifyArtistInfos(oauthId, ownerId, artist.id);
            genres = genres.concat(artistInfos.genres);
        }
        return {genres};
    }

    async function getSpotifyFollowedSongsLength(oauthId: number, ownerId: number): Promise<{
        length: number,
        json: any
    }> {
        let length = 0;
        let json: any;

        json = await fetchWithOAuth(oauthId, ownerId, SPOTIFY_API_BASE_URL + "/me/tracks" + "?limit=50");
        length += json.total;
        return {length, json};
    }

    async function getLastSpotifyFollowedArtist(oauthId: number, ownerId: number): Promise<{
        lastArtist: any
    }> {
        let json: any;
        let lastArtist: any;
        let after: string = "0";

        for (let length = 0; length < 50; length += 1) {
            json = await fetchWithOAuth(oauthId, ownerId, SPOTIFY_API_BASE_URL + "/me/following?type=artist&limit=1&after=" + after);
            after = json.artists.cursors.after;
            lastArtist = json.artists.items[json.artists.items.length - 1];
            length = json.artists.items.length;
        }
        return {lastArtist};
    }

    async function getSpotifyFollowedArtistsLength(oauthId: number, ownerId: number): Promise<{
        length: number
    }> {
        let length = 0;
        let lengthJson: any;
        let json: any;

        lengthJson = await fetchWithOAuth(oauthId, ownerId, SPOTIFY_API_BASE_URL + "/me/following?type=artist&limit=1");
        length += lengthJson.artists.total;
        return {length};
    }

    async function getSpotifyPlaylistLength(oauthId: number, ownerId: number): Promise<{ length: number, json: any }> {
        let length = 0;
        let json: any;
        const spotifyId = await getSpotifyUserId(oauthId, ownerId);

        json = await fetchWithOAuth(oauthId, ownerId, SPOTIFY_API_BASE_URL + "/users/" + spotifyId + "/playlists?limit=10");
        length = json.total;
        return {length, json};
    }

    async function getSpotifyUserId(oauthId: number, ownerId: number): Promise<string> {
        const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
        if (oauthToken === null) {
            throw new Error("OAuth token not found");
        }
        const response: Response = await fetch(SPOTIFY_API_BASE_URL + "/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + oauthToken,
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`Spotify API responded with status: ${response.status}`);
        }
        const json = await response.json();
        return json.id;
    }

    async function getSpotifyAlbumTracks(oauthId: number, ownerId: number, albumId: string): Promise<any> {
        const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
        if (oauthToken === null) {
            throw new Error("OAuth token not found");
        }
        const response: Response = await fetch(SPOTIFY_API_BASE_URL + "/albums/" + albumId + "/tracks", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + oauthToken,
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`Spotify API responded with status: ${response.status}`);
        }
        const json = await response.json();
        return json;
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
            console.error("Error in fetchWithOAuth:", response);
            throw new Error(`Spotify API responded with status: ${response.status}`);
        }
        return await response.json();
    }

    /**
     * Get or create the data of a Spotify trigger
     * @param ownerId - The id of the owner
     * @returns {SpotifyTriggerData} - The data of the Spotify trigger
     */
    function getOrCreateUserData(ownerId: number): { userData: SpotifyTriggerData } {
        const userId = ownerId.toString();

        if (!usersSpotifyTriggerData[userId]) {
            usersSpotifyTriggerData[userId] = {
                userId: userId,
                trackLikedLength: -1,
                trackLikedFromGenreLength: -1,
                trackLikedFromArtistLength: -1,
                albumLikedLength: -1,
                artistLikedLength: -1,
                playlistCreatedLength: -1,
                playlistLikedLength: -1
            };
        }
        return {userData: usersSpotifyTriggerData[userId]};
    }

    /**
     * Check if a new song has been saved
     * @param ownerId - The owner id of the trigger
     * @param oauthId - The oauth id of the trigger
     * @param data - The data of the trigger
     * @returns {Promise<boolean>} - The result of the trigger
     */
    export const checkSpotifyNewSavedSong = async (ownerId: number, oauthId: number): Promise<{
        result: boolean,
        data: any
    }> => {
        try {
            const {length, json} = await getSpotifyFollowedSongsLength(oauthId, ownerId);
            const {userData} = getOrCreateUserData(ownerId);
            const isNew = userData.trackLikedLength === -1;

            if (userData.trackLikedLength < length) {
                userData.trackLikedLength = length;
                if (isNew) {
                    return {result: false, data: null};
                }
            } else {
                userData.trackLikedLength = length;
                return {result: false, data: null};
            }
            let data = json.items[0];
            data.dataType = TRIGGER_DATA_TYPE.SPOTIFY_TRACK;
            data.trackId = data.track.id;
            data.trackUri = data.track.uri;
            return {result: true, data: data};
        } catch (e) {
            console.error("Error in checkSpotifyNewSavedSong:", e);
            return {result: false, data: null};
        }
    }

    /**
     * Check if a new song from a genre has been saved
     * @param ownerId - The owner id of the trigger
     * @param oauthId - The oauth id of the trigger
     * @param data - The data of the trigger
     * @returns {Promise<boolean>} - The result of the trigger
     */
    export const checkSpotifyNewSavedSongFromGenre = async (ownerId: number, oauthId: number, data: any): Promise<{
        result: boolean,
        data: any
    }> => {
        try {
            const {length, json} = await getSpotifyFollowedSongsLength(oauthId, ownerId);
            const {userData} = getOrCreateUserData(ownerId);
            const isNew = userData.trackLikedFromGenreLength === -1;

            if (userData.trackLikedFromGenreLength < length) {
                userData.trackLikedFromGenreLength = length;
                if (isNew) {
                    return {result: false, data: null};
                }
            } else {
                userData.trackLikedFromGenreLength = length;
                return {result: false, data: null};
            }
            let track = json.items[0];
            const {genres} = await getSpotifyArtistsGenres(oauthId, ownerId, track.track.artists);

            track.dataType = TRIGGER_DATA_TYPE.SPOTIFY_TRACK;
            track.trackId = track.track.id;
            track.trackUri = track.track.uri;
            for (const genre of genres) {
                if (genre.toLowerCase().includes(data.genre.toLowerCase())) {
                    return {result: true, data: track};
                }
            }
            return {result: false, data: null};
        } catch (e) {
            console.error("Error in checkSpotifyNewSongFromGenre:", e);
            return {result: false, data: null};
        }
    }

    /**
     * Check if a new song from an artist has been saved
     * @param ownerId - The owner id of the trigger
     * @param oauthId - The oauth id of the trigger
     * @param data - The data of the trigger
     * @returns {Promise<boolean>} - The result of the trigger
     */
    export const checkSpotifyNewSavedSongFromArtist = async (ownerId: number, oauthId: number, data: any): Promise<{
        result: boolean,
        data: any
    }> => {
        try {
            const {length, json} = await getSpotifyFollowedSongsLength(oauthId, ownerId);
            const {userData} = getOrCreateUserData(ownerId);
            const isNew = userData.trackLikedFromArtistLength === -1;

            if (userData.trackLikedFromArtistLength < length) {
                userData.trackLikedFromArtistLength = length;
                if (isNew) {
                    return {result: false, data: null};
                }
            } else {
                userData.trackLikedFromArtistLength = length;
                return {result: false, data: null};
            }
            if (!json.items[0]) {
                return {result: false, data: null};
            }
            let track = json.items[0];
            track.dataType = TRIGGER_DATA_TYPE.SPOTIFY_TRACK;
            track.trackId = track.track.id;
            track.trackUri = track.track.uri;
            if (track.track.artists[0].id === data.artistId) {
                return {result: true, data: track};
            }
            return {result: false, data: null};
        } catch (e) {
            console.error("Error in checkSpotifyNewSongFromArtist:", e);
            return {result: false, data: null};
        }
    }

    /**
     * Check if a new album has been saved
     * @param ownerId - The owner id of the trigger
     * @param oauthId - The oauth id of the trigger
     * @param data - The data of the trigger
     * @returns {Promise<boolean>} - The result of the trigger
     */
    export const checkSpotifyNewSavedAlbum = async (ownerId: number, oauthId: number): Promise<{
        result: boolean,
        data: any
    }> => {
        try {
            const {length, json} = await getSpotifyEntityLength(oauthId, ownerId, "/me/albums");
            const {userData} = getOrCreateUserData(ownerId);
            const isNew = userData.albumLikedLength === -1;
            const albumTracks = await getSpotifyAlbumTracks(oauthId, ownerId, json.items[0].album.id);

            if (userData.albumLikedLength < length) {
                userData.albumLikedLength = length;
                if (isNew) {
                    return {result: false, data: null};
                }
            } else {
                userData.albumLikedLength = length;
                return {result: false, data: null};
            }
            if (!json.items[0]) {
                return {result: false, data: null};
            }
            let album = json.items[0];
            album.dataType = TRIGGER_DATA_TYPE.SPOTIFY_ALBUM;
            album.albumId = album.album.id;
            album.albumUri = album.album.uri;
            return {result: true, data: album};
        } catch (e) {
            console.error("Error in checkSpotifyNewSavedAlbum:", e);
            return {result: false, data: null};
        }
    }

    /**
     * Check if a new artist has been saved
     * @param ownerId - The owner id of the trigger
     * @param oauthId - The oauth id of the trigger
     * @param data - The data of the trigger
     * @returns {Promise<boolean>} - The result of the trigger
     */
    export const checkSpotifyNewSavedArtist = async (ownerId: number, oauthId: number): Promise<{
        result: boolean,
        data: any
    }> => {
        try {
            const {length} = await getSpotifyFollowedArtistsLength(oauthId, ownerId);
            const {userData} = getOrCreateUserData(ownerId);
            const isNew = userData.artistLikedLength === -1;

            if (userData.artistLikedLength < length) {
                userData.artistLikedLength = length;
                if (isNew) {
                    return {result: false, data: null};
                }
            } else {
                userData.artistLikedLength = length;
                return {result: false, data: null};
            }
            const {lastArtist} = await getLastSpotifyFollowedArtist(oauthId, ownerId);
            if (!lastArtist.artists.items[0]) {
                return {result: false, data: null};
            }
            let artist = lastArtist.artists;
            artist.dataType = TRIGGER_DATA_TYPE.SPOTIFY_ARTIST;
            artist.artistId = artist.items[0].id;
            artist.artistUri = artist.items[0].uri;
            return {result: true, data: artist};
        } catch (e) {
            console.error("Error in checkSpotifyNewSavedArtist:", e);
            return {result: false, data: null};
        }
    }

    /**
     * Check if a new playlist has been saved
     * @param ownerId - The owner id of the trigger
     * @param oauthId - The oauth id of the trigger
     * @returns {Promise<boolean>} - The result of the trigger
     */
    export const checkSpotifyNewPlaylistCreated = async (ownerId: number, oauthId: number): Promise<{
        result: boolean,
        data: any
    }> => {
        try {
            const {length, json} = await getSpotifyEntityLength(oauthId, ownerId, "/me/playlists");
            const {userData} = getOrCreateUserData(ownerId);
            const isNew = userData.playlistCreatedLength === -1;

            if (userData.playlistCreatedLength < length) {
                userData.playlistCreatedLength = length;
                if (isNew) {
                    return {result: false, data: null};
                }
            } else {
                userData.playlistCreatedLength = length;
                return {result: false, data: null};
            }
            if (!json.items[0]) {
                return {result: false, data: null};
            }
            if (!json.items[0].owner.id) {
                return {result: false, data: null};
            }
            const playlist = json.items[0];
            let data = playlist;
            data.dataType = TRIGGER_DATA_TYPE.SPOTIFY_PLAYLIST;
            data.playlistUri = playlist.uri;
            data.playlistId = playlist.id;
            return {result: true, data: data};
        } catch (e) {
            console.error("Error in checkSpotifyNewPlaylistCreated:", e);
            return {result: false, data: null};
        }
    }

    export const checkSpotifyNewSavedPlaylist = async (ownerId: number, oauthId: number): Promise<{
        result: boolean,
        data: any
    }> => {
        try {
            const {length, json} = await getSpotifyPlaylistLength(oauthId, ownerId);
            const {userData} = getOrCreateUserData(ownerId);
            const isNew = userData.playlistLikedLength === -1;

            if (userData.playlistLikedLength < length) {
                userData.playlistLikedLength = length;
                if (isNew) {
                    return {result: false, data: null};
                }
            } else {
                userData.playlistLikedLength = length;
                return {result: false, data: null};
            }
            if (!json.items[0]) {
                return {result: false, data: null};
            }
            if (!json.items[0].owner.id) {
                return {result: false, data: null};
            }
            const playlist = json.items[0];
            let data = playlist;
            data.dataType = TRIGGER_DATA_TYPE.SPOTIFY_PLAYLIST;
            data.playlistUri = playlist.uri;
            data.playlistId = playlist.id;
            return {result: true, data: data};
        } catch (e) {
            console.error("Error in checkSpotifyNewSavedPlaylist:", e);
            return {result: false, data: null};
        }
    }
}

export {SpotifyTriggers};
