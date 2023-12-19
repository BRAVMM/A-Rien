/**
 * @fileoverview API Action Reaction Services Apps
 */

/**
 * @enum {number} TRIGGER_DATA_TYPE
 * @description Enum of the action data types
 * Every trigger must have a var names "dataType" with the value of the enum
 * It will be used to know which service data to use and handle it
 */
enum TRIGGER_DATA_TYPE {
    /**
     * @description Spotify playlist
     * @type {number} SPOTIFY_PLAYLIST
     * @data {string} playlistUri - The uri of the playlist
     * @data {JSON} see: https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
     */
    SPOTIFY_PLAYLIST,
    SPOTIFY_TRACK,
    SPOTIFY_ARTIST,
    SPOTIFY_ALBUM,
}

export {TRIGGER_DATA_TYPE};