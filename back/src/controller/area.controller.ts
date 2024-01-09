import {Request, Response} from 'express';
import db from '../models/index';

/* Models */
import {Service} from "../models/service.model";
import {Action} from "../models/action.model";
import {Reaction} from "../models/reaction.model";
import {ActionData} from "../models/actionData.model";
import {ReactionData} from "../models/reactionData.model";

/* Interfaces */
import {TokenData} from "../interfaces/token.interface";

/* Middleware */
import {AreaMiddleware} from "../middleware/area.middleware";
import {CustomRequest} from "../interfaces/request.interface";

/* Constants */
const SERVICES_WITHOUT_OAUTH :number[] = [2 /* Timer */];

/**
 * Get services
 * @param req - This is the request object
 * @param res - This is the response object containing the services
 */
const getServices = async (req: Request, res: Response): Promise<void> => {
    try {
        const services: Service[] | null = await AreaMiddleware.getServices();

        res.status(200).json(services);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({error: "An unexpected error occurred"});
    }
}

/**
 * Get actions from service id
 * @param req - This is the request object containing the service id
 * @param res - This is the response object containing the actions
 */
const getActionsFromServiceId = async (req: Request, res: Response): Promise<void> => {
    try {
        const serviceId = parseInt(req.params.serviceId, 10);

        if (isNaN(serviceId)) {
            res.status(400).json({error: "Please provide a valid serviceId"});
            return;
        }

        const serviceLength: number = await Service.count();
        if (serviceId < 1 || serviceId > serviceLength) {
            res.status(400).json({error: "Invalid serviceId"});
            return;
        }
        const action: Action[] | null = await AreaMiddleware.getActionsFromServiceId(serviceId);

        if (!action) {
            res.status(400).json({error: "Action not found"});
            return;
        }
        res.status(200).json(action);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({error: "An unexpected error occurred"});
    }
}

/**
 * Get reactions from action id
 * @param req - This is the request object containing the action id
 * @param res - This is the response object containing the reactions compatible with the action
 */
const getReactionsFromActionId = async (req: Request, res: Response): Promise<void> => {
    try {
        const {actionId} = req.params;

        if (!actionId || isNaN(parseInt(actionId))) {
            res.status(400).json({error: "Please provide actionId"});
            return;
        }
        const action: Action | null = await AreaMiddleware.getActionFromId(parseInt(actionId));

        if (!action) {
            res.status(400).json({error: "Action not found"});
            return;
        }
        const reactions: Reaction[] | null = await AreaMiddleware.getReactionsFromIds(action.reactionsIds, (req as CustomRequest).user.userId);

        res.status(200).json(reactions);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({error: "An unexpected error occurred"});
    }
}

const getOauthIdsFromServiceId = async (req: Request, res: Response): Promise<void> => {
    try {
        const {serviceId} = req.params;
        const ownerId = (req as CustomRequest).user.userId;

        if (!serviceId || isNaN(parseInt(serviceId)) || !ownerId) {
            res.status(400).json({error: "Please provide serviceId and ownerId"});
            return;
        }
        if (SERVICES_WITHOUT_OAUTH.includes(parseInt(serviceId))) {
            res.status(200).json([-1]);
            return;
        }
        const service: Service | null = await AreaMiddleware.getServiceFromId(parseInt(serviceId));

        if (!service) {
            res.status(400).json({error: "Service not found"});
            return;
        }
        const oauthIds: number[] | null = await AreaMiddleware.getOauthIdsFromServiceId(parseInt(serviceId), ownerId);

        if (!oauthIds) {
            res.status(400).json({error: "OauthIds not found"});
            return;
        }
        res.status(200).json(oauthIds);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({error: "An unexpected error occurred"});
    }
}

const getOauthIdsFromActionId = async (req: Request, res: Response): Promise<void> => {
    try {
        const {actionId} = req.params;
        const ownerId = (req as CustomRequest).user.userId;

        if (!actionId || isNaN(parseInt(actionId)) || !ownerId) {
            res.status(400).json({error: "Please provide actionId"});
            return;
        }
        const service: Service | null = await AreaMiddleware.getServiceFromActionId(parseInt(actionId));

        if (!service) {
            res.status(400).json({error: "Service not found"});
            return;
        }
        const oauthIds: number[] | null = await AreaMiddleware.getOauthIdsFromServiceId(service.id, ownerId);

        if (!oauthIds) {
            res.status(400).json({error: "OauthIds not found"});
            return;
        }
        res.status(200).json(oauthIds);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({error: "An unexpected error occurred"});
    }
}

const getOauthIdsFromReactionId = async (req: Request, res: Response): Promise<void> => {
    try {
        const {reactionId} = req.params;
        const ownerId = (req as CustomRequest).user.userId;

        if (!reactionId || isNaN(parseInt(reactionId)) || !ownerId) {
            res.status(400).json({error: "Please provide reactionId"});
            return;
        }
        const service: Service | null = await AreaMiddleware.getServiceFromReactionId(parseInt(reactionId));

        if (!service) {
            res.status(400).json({error: "Service not found"});
            return;
        }
        const oauthIds: number[] | null = await AreaMiddleware.getOauthIdsFromServiceId(service.id, ownerId);

        if (!oauthIds) {
            res.status(400).json({error: "OauthIds not found"});
            return;
        }
        res.status(200).json(oauthIds);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({error: "An unexpected error occurred"});
    }
}

/**
 * Store area
 * @param req - This is the request object containing the area data
 * @param res - This is the response object containing the area data id
 * @returns {Promise<void>}
 * @throws {Error} - An error
 * @description This function store an area in the database
 */
const storeArea = async (req: Request, res: Response): Promise<void> => {
    const dbTransaction = await db.sequelize.transaction();

    try {
        const user: TokenData = (req as CustomRequest).user;
        const name: string = req.body.name;
        const actionId: number = req.body.actionId;
        const reactionIds: number[] = req.body.reactionIds;
        const actionData: ActionData[] = req.body.actionData;
        const reactionsData: ReactionData[] = req.body.reactionsData;
        const oauthTokens: number[] = req.body.oauthTokens;

        if (!name || !actionId || !reactionIds || !actionData || !reactionsData || !oauthTokens) {
            res.status(400).json({error: "Please provide name, actionId, reactionId, actionData and reactionData"});
            return;
        }
        const action: Action | null = await AreaMiddleware.getActionFromId(actionId);

        if (!action) {
            res.status(400).json({error: "Action not found"});
            return;
        }

        for (let i: number = 0; i < reactionIds.length; i++) {
            const reaction: Reaction | null = await AreaMiddleware.getReactionFromId(reactionIds[i]);
            if (!reaction) {
                res.status(400).json({error: "Reaction not found"});
                return;
            }
        }
        if (reactionIds.length !== reactionsData.length || reactionIds.length !== oauthTokens.length - 1) {
            res.status(400).json({error: "Please provide the same number of reactionIds, reactionsData and oauthTokens"});
            return;
        }
        let reactionDataIds: number[] = [];

        for (let i: number = 0; i < reactionsData.length; i++) {
            const reactionData: ReactionData = reactionsData[i];
            const reactionDataIdTemp: number = await ReactionData.create({
                ownerId: user.userId,
                data: reactionData,
                reactionId: reactionIds[i],
                title: name,
                isActivated: true,
                oauthId: oauthTokens[i + 1]
            }, {transaction: dbTransaction}
            ).then((reactionData: ReactionData) => reactionData.id);
            reactionDataIds.push(reactionDataIdTemp);
        }

        const actionDataId: number = await ActionData.create({
            ownerId: user.userId,
            data: actionData,
            reactionsDataIds: reactionDataIds,
            actionId: actionId,
            title: name,
            isActivated: true,
            oauthId: oauthTokens[0]
        }, {transaction: dbTransaction}
        ).then((actionData: ActionData) => actionData.id);
        dbTransaction.commit();
        res.status(200).json({actionDataId, reactionDataIds});
    } catch (error: any) {
        await dbTransaction.rollback();
        console.error(error);
        res.status(500).json({error: "An unexpected error occurred"});
    }
}

export {
    getActionsFromServiceId,
    getReactionsFromActionId,
    getServices,
    storeArea,
    getOauthIdsFromServiceId,
    getOauthIdsFromActionId,
    getOauthIdsFromReactionId
};
