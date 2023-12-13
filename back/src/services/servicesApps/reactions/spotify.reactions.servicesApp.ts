/**
 * @fileOverview Spotify reactions services
 */

/**
 * @namespace SpotifyReactions
 * @description Spotify reactions services
 */
namespace SpotifyReactions {
    /**
     * Add a song to a playlist
     * @param actionData - The action data
     * @param reactionData - The reaction data
     * @returns {Promise<boolean>} - The result of the reaction
     */
    export const reactionSpotifyAddToPlaylist = async (actionData: JSON, reactionData: JSON): Promise<boolean> => {
        console.log(actionData);
        console.log(reactionData);
        return true;
    }
}

export { SpotifyReactions };
