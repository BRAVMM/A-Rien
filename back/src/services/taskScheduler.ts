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
import {TimerTriggers} from "./servicesApps/triggers/timer.triggers.servicesApp";
/* Import all reactions functions */
import {SpotifyReactions} from "./servicesApps/reactions/spotify.reactions.servicesApp";
import { OutlookReactions } from './servicesApps/reactions/outlook.reactions.servicesApp';
import { TeamsReactions } from './servicesApps/reactions/teams.reactions.servicesApp';
import {DiscordReactions} from "./servicesApps/reactions/discord.reactions.servicesApp";
import { OutlookTriggers } from './servicesApps/triggers/outlook.triggers.services';
import { OneDriveTriggers } from './servicesApps/triggers/onedrive.triggers.services';

/* Constants */
const ACTIONS_FUNCTIONS: actionFunction = {
    1: SpotifyTriggers.checkSpotifyNewSavedSong,
    2: SpotifyTriggers.checkSpotifyNewSavedAlbum,
    3: SpotifyTriggers.checkSpotifyNewPlaylistCreated,
    4: SpotifyTriggers.checkSpotifyNewSavedPlaylist,
    5: SpotifyTriggers.checkSpotifyNewSavedSongFromGenre,
    6: SpotifyTriggers.checkSpotifyNewSavedSongFromArtist,
    7: TimerTriggers.actionWhenXTimeStamped,
    8: OutlookTriggers.checkOutlookNewEmail,
    9: OneDriveTriggers.getTriggerData,
};

const REACTIONS_FUNCTIONS: reactionFunction = {
    1: SpotifyReactions.reactionSpotifyAddToPlaylistFromASong,
    2: SpotifyReactions.reactionSpotifyAddRandomToPlaylist,
    3: DiscordReactions.reactionDiscordSendMessage,
    4: TeamsReactions.reactionTeamsSendMessage,
    5: TeamsReactions.reactionTeamsSendMessageInTeamChannel,
    6: OutlookReactions.reactionOutlookSendEmail,
    7: OutlookReactions.reactionOutlookCreateFolder,
};

/**
 * @namespace TaskScheduler
 * @description Task scheduler service
 */
namespace TaskScheduler {
    /**
     * Execute all reactions related to an action
     * @param actionData - The action data
     * @param actionDataDatas
     * @returns {Promise<void>}
     */
    const executeReactionsFromActionData = async (actionData: ActionData, actionDataDatas: JSON): Promise<void> => {
        try {
            for (const reactionDataId of actionData.reactionsDataIds) {
                const reactionData: ReactionData | null = await TriggersMiddleware.getReactionDataFromId(actionData.ownerId, reactionDataId);

                if (!reactionData) {
                    console.error('Reaction data not found');
                    continue;
                }
                const reactionFunction = REACTIONS_FUNCTIONS[reactionData.reactionId];

                if (reactionData && reactionFunction) {
                    await reactionFunction(actionData.ownerId, reactionData.oauthId, actionDataDatas, reactionData.data);
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
                const parsedActionData: any = JSON.parse(actionData.data);
                const actionDataResult = await actionFunction(actionData.ownerId, actionData.oauthId, parsedActionData[0]);
                if (actionDataResult.result) {
                    await executeReactionsFromActionData(actionData, actionDataResult.data);
                }
            } else {
                console.error('Action function not found');
            }
        }
    }
}

export {TaskScheduler};
