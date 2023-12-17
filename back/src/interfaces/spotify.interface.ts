/**
 * @fileoverview Interfaces for the Spotify service
 */

/**
 * @interface SpotifyTriggerData
 * @description The data of a Spotify trigger
 */
interface SpotifyTriggerData {
    userId: string;
    TrackLikedLength: number;
    AlbumLikedLength: number;
    ArtistLikedLength: number;
    PlaylistLikedLength: number;
}