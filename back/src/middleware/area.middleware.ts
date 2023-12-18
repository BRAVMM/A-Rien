/**
 * @fileoverview Area middleware
 */

/* Models */
import {Service} from "../models/service.model";
import {Action} from "../models/action.model";
import {Reaction} from "../models/reaction.model";

/**
 * @namespace AreaMiddleware
 * @description Area middleware
 */
namespace AreaMiddleware {
    /**
     * Get all services
     * @returns {Promise<Service[] | null>}
     */
    export const getServices = async (): Promise<Service[] | null> => {
        try {
            return await Service.findAll();
        } catch (error) {
            console.error('Error retrieving services:', error);
            return null;
        }
    }

    /**
     * Get a service from an id
     * @param actionsIds - The ids of the actions
     * @returns {Promise<Action[] | null>}
     */
    export const getActionsFromIds = async (actionsIds: number[]): Promise<Action[] | null> => {
        try {
            return await Action.findAll(
                {
                    where: {
                        id: actionsIds
                    }
                }
            );
        } catch (error) {
            console.error(`Error retrieving actions with IDs ${actionsIds}:`, error);
            return null;
        }
    }

    /**
     * Get an action from an id
     * @param actionId - The id of the action
     * @returns {Promise<Action | null>}
     */
    export const getActionFromId = async (actionId: number): Promise<Action | null> => {
        try {
            return await Action.findOne(
                {
                    where: {
                        id: actionId
                    }
                }
            );
        } catch (error) {
            console.error(`Error retrieving action with ID ${actionId}:`, error);
            return null;
        }
    }

    /**
     * Get a service from an id
     * @param serviceId - The id of the service
     * @returns {Promise<Action[] | null>}
     */
    export const getActionsFromServiceId = async (serviceId: number): Promise<Action[] | null> => {
        try {
            const service: Service | null = await Service.findOne(
                {
                    where: {
                        id: serviceId
                    },
                }
            );
            if (!service) {
                return null;
            }
            const actions: number[] = service.actionsId
            return await Action.findAll(
                {
                    where: {
                        id: actions
                    }
                }
            );
        } catch (error) {
            console.error(`Error retrieving actions with service ID ${serviceId}:`, error);
            return null;
        }
    }

    /**
     * Get reactions from ids
     * @param reactionsIds - The ids of the reactions
     * @returns {Promise<Reaction[] | null>}
     */
    export const getReactionsFromIds = async (reactionsIds: number[]): Promise<Reaction[] | null> => {
        try {
            return await Reaction.findAll(
                {
                    where: {
                        id: reactionsIds
                    }
                }
            );
        } catch (error) {
            console.error(`Error retrieving reactions with IDs ${reactionsIds}:`, error);
            return null;
        }
    }

    /**
     * Get a reaction from an id
     * @param reactionId - The id of the reaction
     * @returns {Promise<Reaction | null>}
     */
    export const getReactionFromId = async (reactionId: number): Promise<Reaction | null> => {
        try {
            return await Reaction.findOne(
                {
                    where: {
                        id: reactionId
                    }
                }
            );
        } catch (error) {
            console.error(`Error retrieving reaction with ID ${reactionId}:`, error);
            return null;
        }
    }
}

export {AreaMiddleware};
