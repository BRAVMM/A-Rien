/**
 * @fileoverview service for actionJsonData
 */

import {ModalDataInterface, ServiceActionInterface, ServiceReactionInterface} from "../Interfaces/ModalData.interface";

/**
 * @namespace actionReactionJsonDataService
 * @description actionReactionJsonDataService
 */
namespace actionReactionJsonDataService {
    /**
     * @function getServices
     * @description get all services
     * @returns {Promise<ServiceActionInterface[]>}
     * @memberof actionReactionJsonDataService
     */
    export const getServices = async (): Promise<ModalDataInterface[]> => {
        const response: Response = await fetch(`${process.env.REACT_APP_API_URL}/area/getServices`);
        const services: ModalDataInterface[] = await response.json();

        console.log("services", services);
        return services;
    }

    /**
     * @function getActionJsonData
     * @description get actionJsonData, based on serviceId
     * @returns {Promise<ServiceActionInterface[]>}
     * @memberof actionReactionJsonDataService
     */
    export const getActionJsonData = async (serviceId: number): Promise<ServiceActionInterface[]> => {
        const response: Response = await fetch(`${process.env.REACT_APP_API_URL}/area/getActionsFromServiceId//${serviceId}`);
        const actionJsonData: ServiceActionInterface[] = await response.json();

        console.log("actionJsonData", actionJsonData);
        return actionJsonData;
    }

    /**
     * @function getReactionJsonData
     * @description get reactionJsonData, based on actionId
     * @returns {Promise<ServiceReactionInterface[]>}
     * @memberof actionReactionJsonDataService
     */
    export const getReactionJsonData = async (actionId: number): Promise<ServiceReactionInterface[]> => {
        const response: Response = await fetch(`${process.env.REACT_APP_API_URL}/area/getReactionsFromActionId/${actionId}`);
        const reactionJsonData: ServiceReactionInterface[] = await response.json();

        console.log("reactionJsonData", reactionJsonData);
        return reactionJsonData;
    }
}

export default actionReactionJsonDataService;
