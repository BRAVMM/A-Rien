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
    trackLikedFromGenreLength: number;
    trackLikedFromArtistLength: number;
    albumLikedLength: number;
    artistLikedLength: number;
    playlistCreatedLength: number;
    playlistLikedLength: number;
}
