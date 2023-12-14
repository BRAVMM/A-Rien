/**
 * @fileOverview Task scheduler service
 * @namespace TaskScheduler
 */

/* Models */
import {ActionData} from '../models/actionData.model';
import {ReactionData} from "../models/reactionData.model";

/* Middleware */
import {TriggersMiddleware} from "../middleware/triggers.middleware";

/* Interfaces */
/* Interface for the task scheduler */
import {actionFunction, reactionFunction} from '../interfaces/taskScheduler.interface';
/* Import all triggers functions */
import {SpotifyTriggers} from "./servicesApps/triggers/spotify.triggers.servicesApp";
/* Import all reactions functions */
import {SpotifyReactions} from "./servicesApps/reactions/spotify.reactions.servicesApp";

/* Constants */
const ACTIONS_FUNCTIONS: actionFunction = {
    1: SpotifyTriggers.checkSpotifyNewSavedSong,
    2: SpotifyTriggers.checkSpotifyNewSavedAlbum,
    3: SpotifyTriggers.checkSpotifyNewSavedArtist,
    4: SpotifyTriggers.checkSpotifyNewSavedPlaylist,
};

const REACTIONS_FUNCTIONS: reactionFunction = {
    1: SpotifyReactions.reactionSpotifyAddToPlaylist,
};

/**
 * @namespace TaskScheduler
 * @description Task scheduler service
 */
namespace TaskScheduler {
    /**
     * Execute all reactions related to an action
     * @param actionData - The action data
     * @returns {Promise<void>}
     */
    const executeReactionsFromActionData = async (actionData: ActionData): Promise<void> => {
        try {
            for (const reactionDataId of actionData.reactionsDataIds) {
                const reactionData: ReactionData | null = await TriggersMiddleware.getReactionDataFromId(actionData.ownerId, reactionDataId);

                if (!reactionData) {
                    console.error('Reaction data not found');
                    continue;
                }
                const reactionFunction = REACTIONS_FUNCTIONS[reactionData.reactionId];

                if (reactionData && reactionFunction) {
                    await reactionFunction(actionData.ownerId, reactionData.oauthId, actionData.data, reactionData.data);
                } else {
                    console.error('Reaction function not found');
                }
            }
        } catch (error) {
            console.error('Error executing reactions from action data:', error);
        }
    }

    /**
     * Check all triggers
     * @returns {Promise<void>}
     * @throws {Error}
     */
    export const checkTriggers = async (): Promise<void> => {
        const actionsData: ActionData[] = await TriggersMiddleware.getActionsData();

        for (const actionData of actionsData) {
            const actionFunction = ACTIONS_FUNCTIONS[actionData.actionId];

            if (actionFunction) {
                if (await actionFunction(actionData.ownerId, actionData.oauthId, actionData.data)) {
                    await executeReactionsFromActionData(actionData);
                }
            } else {
                console.error('Action function not found');
            }
        }
    }
}

export {TaskScheduler};