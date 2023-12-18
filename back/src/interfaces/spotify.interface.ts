/**
 * @fileoverview Interfaces for the Spotify service
 */

/**
 * @interface SpotifyTriggerData
 * @description The data of a Spotify trigger
 */
interface SpotifyTriggerData {
    userId: string;
    trackLikedLength: number;
    albumLikedLength: number;
    artistLikedLength: number;
    playlistLikedLength: number;
}
