/**
 * @fileoverview Area middleware
 */

/* Models */
import {Service} from "../models/service.model";
import {Action} from "../models/action.model";
import {Reaction} from "../models/reaction.model";
import {OAuth} from "../models/oauth.model";
import {ActionData} from "../models/actionData.model";
import db from "../models";

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
     * Get Service from id
     * @param serviceId - The id of the service
     * @returns {Promise<Service | null>}
     */
    export const getServiceFromId = async (serviceId: number): Promise<Service | null> => {
        try {
            return await Service.findOne(
                {
                    where: {
                        id: serviceId
                    }
                }
            );
        } catch (error) {
            console.error(`Error retrieving service with ID ${serviceId}:`, error);
            return null;
        }
    }

    /**
     * Get Service from action id
     * @param actionId - The id of the action
     * @returns {Promise<Service | null>}
     */
    export const getServiceFromActionId = async (actionId: number): Promise<Service | null> => {
        try {
            const services: Service[] | null = await Service.findAll();

            if (!services) {
                return null;
            }
            let service: Service | null = null;

            services.forEach((s) => {
                if (s.actionsIds.includes(actionId)) {
                    service = s;
                }
            });
            return service;
        } catch (error) {
            console.error(`Error retrieving service with action ID ${actionId}:`, error);
            return null;
        }
    }

    /**
     * Get Service from reaction id
     * @param reactionId - The id of the reaction
     * @returns {Promise<Service | null>}
     */
    export const getServiceFromReactionId = async (reactionId: number): Promise<Service | null> => {
        try {
            const services: Service[] | null = await Service.findAll();

            if (!services) {
                return null;
            }
            let service: Service | null = null;

            services.forEach((s) => {
                if (s.reactionsIds.includes(reactionId)) {
                    service = s;
                }
            });
            return service;
        } catch (error) {
            console.error(`Error retrieving service with reaction ID ${reactionId}:`, error);
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
            return await Action.findByPk(actionId);
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
            const actionsResult: Action[] = [];
            const services: Service[] | null = await Service.findAll(
                {
                    where: {
                        serviceId: serviceId
                    },
                }
            );
            if (!services || services.length === 0) {
                return null;
            }
            for (let service of services) {
                const actionsIds: number[] = service.actionsIds;
                const actions = await Action.findAll(
                    {
                        where: {
                            id: actionsIds
                        }
                    }
                );
                if (!actions) {
                    continue;
                }
                actionsResult.push(...actions);
            }
            return actionsResult;
        } catch (error) {
            console.error(`Error retrieving actions with service ID ${serviceId}:`, error);
            return null;
        }
    }

    /**
     * Get reactions from ids
     * @param reactionsIds - The ids of the reactions
     * @param ownerId - The id of the owner
     * @returns {Promise<Reaction[] | null>} - The reactions compatible with the action
     */
    export const getReactionsFromIds = async (reactionsIds: number[], ownerId?: number): Promise<Reaction[] | null> => {
        try {
            const reactions = await Reaction.findAll(
                {
                    where: {
                        id: reactionsIds
                    }
                }
            );
            console.log("ownerId : " + ownerId);
            if (ownerId) {
                const availableReactions: Reaction[] = [];
                if (!reactions) {
                    return null;
                }
                for (const reaction of reactions) {
                    const oauthIds: number[] | null = await getOauthIdsFromReactionId(reaction.id, ownerId);
                    if (oauthIds && oauthIds.length > 0) {
                        availableReactions.push(reaction);
                    }
                }
                return availableReactions;
            }
            return reactions;
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

    /**
     * Get Oauth ids from service id
     * @param serviceId - The id of the service
     * @param ownerId - The id of the owner
     * @returns {Promise<number[] | null>}
     * @throws {Error} If the service is not found
     */
    export const getOauthIdsFromServiceId = async (serviceId: number, ownerId: number): Promise<number[] | null> => {
        try {
            let oauthIds: number[] = [];

            const OAuths: OAuth[] | null = await OAuth.findAll(
                {
                    where: {
                        serviceId: serviceId,
                        ownerId: ownerId,
                    }
                }
            );
            console.log("OAUTHs : " + OAuths);
            if (!OAuths) {
                return null;
            }
            OAuths.forEach((OAuth) => {
                oauthIds.push(OAuth.id);
            });
            return oauthIds;
        } catch (error) {
            console.error(`Error retrieving oauthIds with service ID ${serviceId}:`, error);
            return null;
        }
    }

    export const eraseArea = async (actionId: number, ownerId: number): Promise<boolean> => {
        const dbTransaction = await db.sequelize.transaction();

        try {
            const action = await ActionData.findByPk(actionId);
            if (!action || action.ownerId !== ownerId) {
                return false;
            }
            for (const reactionId of action.reactionsDataIds || []) {
                const reaction = await Reaction.findByPk(reactionId);
                if (reaction) {
                    await reaction.destroy({transaction: dbTransaction});
                }
            }
            await action.destroy({transaction: dbTransaction});
            await dbTransaction.commit();
            return true;
        } catch (error) {
            console.error(`Error erasing area with ID ${actionId}:`, error);
            await dbTransaction.rollback();
            return false;
        }
    }

    export const toggleArea = async (actionId: number, ownerId: number): Promise<boolean> => {
        const dbTransaction = await db.sequelize.transaction();

        try {
            const action = await ActionData.findByPk(actionId);
            if (!action || action.ownerId !== ownerId) {
                return false;
            }
            action.isActivated = !action.isActivated;
            await action.save({transaction: dbTransaction});
            await dbTransaction.commit();
            return true;
        } catch (error) {
            await dbTransaction.rollback();
            console.error(`Error toggling area with ID ${actionId}:`, error);
            return false;
        }
    }
}

/**
 * Get Oauth ids from action id
 * @param reactionId - The id of the reaction
 * @param ownerId - The id of the owner
 * @returns {Promise<number[] | null>} - The oauth ids
 */
const getOauthIdsFromReactionId = async (reactionId: number, ownerId: number): Promise<number[] | null> => {
    try {
        const service: Service | null = await AreaMiddleware.getServiceFromReactionId(reactionId);

        if (!service) {
            throw new Error(`Service not found for reaction ID ${reactionId}`);
        }
        return await AreaMiddleware.getOauthIdsFromServiceId(service.id, ownerId);
    } catch (error) {
        console.error(`Error retrieving oauthIds with reaction ID ${reactionId}:`, error);
        return null;
    }
}

export {AreaMiddleware};
