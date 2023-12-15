/**
 * @fileoverview Triggers middleware
 */

import {ActionData} from '../models/actionData.model';
import {Action} from '../models/action.model';
import {ReactionData} from "../models/reactionData.model";

/**
 * @namespace TriggersMiddleware
 * @description Triggers middleware
 */
namespace TriggersMiddleware {
    /**
     * Get all actions datas
     * @returns {Promise<ActionData[]>} - The actions datas
     */
    export const getActionsData = async (): Promise<ActionData[]> => {
        try {
            return await ActionData.findAll(
                {
                    where: {
                        isActivated: true
                    }
                }
            );
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /**
     * Get a reaction data from an id
     * @param reactionDataId - The id of the reaction data
     * @returns {Promise<ReactionData | null>} - The reaction data
     */
    export const getReactionDataFromId = async (owenerId: number, reactionDataId: number): Promise<ReactionData | null> => {
        try {
            return await ReactionData.findOne(
                {
                    where: {
                        id: reactionDataId,
                        ownerId: owenerId
                    }
                }
            );
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    /**
     * Get an action from an action data
     * @param actionData
     * @returns {Promise<Action>} - The action
     */
    export const getActionFromActionData = async (actionData: ActionData): Promise<Action | null> => {
        try {
            return await Action.findByPk(actionData.actionId);
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export {TriggersMiddleware};
