/**
 * @fileOverview Spotify Triggers ServicesApp
 */

/**
 * @namespace SpotifyTriggers
 * @description Spotify Triggers ServicesApp
 */
namespace SpotifyTriggers {
    /**
     * Check if a new song has been saved
     * @param ownerId - The owner id of the trigger
     * @param oauthId - The oauth id of the trigger
     * @param data - The data of the trigger
     * @returns {Promise<boolean>} - The result of the trigger
     */
    export const checkSpotifyNewSavedSong = async (ownerId: number, oauthId: number, data: JSON): Promise<boolean> => {
        console.log(ownerId);
        console.log(oauthId);
        console.log(data);
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
        console.log(ownerId);
        console.log(oauthId);
        console.log(data);
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
        console.log(ownerId);
        console.log(oauthId);
        console.log(data);
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
        console.log(ownerId);
        console.log(oauthId);
        console.log(data);
        return true;
    }
}

export {SpotifyTriggers};
