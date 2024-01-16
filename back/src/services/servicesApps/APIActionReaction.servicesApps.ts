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
    SPOTIFY_PLAYLIST = 1,
    SPOTIFY_TRACK = 2,
    SPOTIFY_ARTIST = 3,
    SPOTIFY_ALBUM = 4,
    OUTLOOK_EMAIL = 5,
}

export {TRIGGER_DATA_TYPE};
