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
     * @param data - The data of the trigger
     * @returns {Promise<boolean>} - The result of the trigger
     */
    export const checkSpotifyNewSavedSong = async (data: JSON): Promise<boolean> => {
        console.log(data);
        return true;
    }

    /**
     * Check if a new album has been saved
     * @param data - The data of the trigger
     * @returns {Promise<boolean>} - The result of the trigger
     */
    export const checkSpotifyNewSavedAlbum = async (data: JSON): Promise<boolean> => {
        console.log(data);
        return true;
    }

    /**
     * Check if a new artist has been saved
     * @param data - The data of the trigger
     * @returns {Promise<boolean>} - The result of the trigger
     */
    export const checkSpotifyNewSavedArtist = async (data: JSON): Promise<boolean> => {
        console.log(data);
        return true;
    }

    /**
     * Check if a new playlist has been saved
     * @param data - The data of the trigger
     * @returns {Promise<boolean>} - The result of the trigger
     */
    export const checkSpotifyNewSavedPlaylist = async (data: JSON): Promise<boolean> => {
        console.log(data);
        return true;
    }
}

export { SpotifyTriggers };
