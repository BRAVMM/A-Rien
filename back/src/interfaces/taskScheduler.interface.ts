/**
 * @fileoverview Interfaces for the task scheduler
 */

import {ActionData} from "../models/actionData.model";

/**
 * Interface for the task scheduler
 * @interface actionFunction
 * @param {number} id - The id of the action
 * @param {function} action - The function to execute related to the action id
 */
interface actionFunction {
    [key: number]: (ownerId: number, oauthId: number, data: JSON) => Promise<boolean>;
}

/**
 * Interface for the task scheduler
 * @interface reactionFunction
 * @param {number} id - The id of the reaction
 * @param {function} reaction - The function to execute related to the reaction id
 */
interface reactionFunction {
    [key: number]: (ownerId: number, oauthId: number, actionData: JSON, reactionData: JSON) => Promise<boolean>;
}

export {actionFunction, reactionFunction};
