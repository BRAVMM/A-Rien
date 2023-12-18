import {Request, Response} from 'express';

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
        const {serviceId} = req.params;


        if (!serviceId || isNaN(parseInt(serviceId))) {
            res.status(400).json({error: "Please provide serviceId"});
            return;
        }
        const action: Action[] | null = await AreaMiddleware.getActionsFromServiceId(parseInt(serviceId));

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
        const reactions: Reaction[] | null = await AreaMiddleware.getReactionsFromIds(action.reactionsIds);

        res.status(200).json(reactions);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({error: "An unexpected error occurred"});
    }
}

const storeArea = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: TokenData = (req as CustomRequest).user;
        const name: string = req.body.name;
        const actionId: number = req.body.actionId;
        const reactionId: number = req.body.reactionId;
        const actionData: ActionData[] = req.body.actionData;
        const reactionsData: ReactionData[] = req.body.reactionsData;
        const oauthTokens: number[] = req.body.oauthTokens;

        if (!name || !actionId || !reactionId || !actionData || !reactionsData || !oauthTokens) {
            res.status(400).json({error: "Please provide name, actionId, reactionId, actionData and reactionData"});
            return;
        }
        const action: Action | null = await AreaMiddleware.getActionFromId(actionId);

        if (!action) {
            res.status(400).json({error: "Action not found"});
            return;
        }
        const reaction: Reaction | null = await AreaMiddleware.getReactionFromId(reactionId);

        if (!reaction) {
            res.status(400).json({error: "Reaction not found"});
            return;
        }
        let reactionDataIds: number[] = [];

        for (let i: number = 0; i < reactionsData.length; i++) {
            const reactionData: ReactionData = reactionsData[i];
            const reactionDataIdTemp: number = await ReactionData.create({
                ownerId: user.userId,
                data: reactionData,
                reactionId: reactionId,
                title: name,
                isActivated: true,
                oauthId: oauthTokens[i + 1]
            }).then((reactionData: ReactionData) => reactionData.id);
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
        }).then((actionData: ActionData) => actionData.id);
        res.status(200).json({actionDataId, reactionDataIds});
    } catch (error: any) {
        console.error(error);
        res.status(500).json({error: "An unexpected error occurred"});
    }
}

export {getActionsFromServiceId, getReactionsFromActionId, getServices};
