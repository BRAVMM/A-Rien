/**
 * @fileoverview service for actionJsonData
 */

import {ModalDataInterface, ServiceActionInterface, ServiceReactionInterface} from "../Interfaces/ModalData.interface";
import Cookies from "js-cookie";

/**
 * @namespace actionReactionJsonDataService
 * @description actionReactionJsonDataService
 */
namespace actionReactionJsonDataService {
    const requestApi = async (url: string, method: string, body: any) => {
        const bearer = Cookies.get('token')
        let response: Response;

        if (method === "GET") {
            response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${bearer}`,
                },
            });
        } else {
            response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${bearer}`,
                },
                body: JSON.stringify(body),
            });
        }
        return response;
    }

    /**
     * @function getServices
     * @description get all services
     * @returns {Promise<ServiceActionInterface[]>}
     * @memberof actionReactionJsonDataService
     */
    export const getServices = async (): Promise<ModalDataInterface[]> => {
        console.log("getServices");
        // const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API}/area/getServices`);
        const response: Response = await requestApi(`${process.env.NEXT_PUBLIC_API}/area/getServices`, "GET", null)
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
        const response: Response = await requestApi(`${process.env.NEXT_PUBLIC_API}/area/getActionsFromServiceId/${serviceId}`, "GET", null)
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
        const response: Response = await requestApi(`${process.env.NEXT_PUBLIC_API}/area/getReactionsFromActionId/${actionId}`, "GET", null)
        const reactionJsonData: ServiceReactionInterface[] = await response.json();

        console.log("reactionJsonData", reactionJsonData);
        return reactionJsonData;
    }

    /**
     * @function getOauthIdsFromServiceId
     * @description get oauthIds, based on serviceId
     * @returns {Promise<number[]>}
     * @memberof actionReactionJsonDataService
     */
    export const getOauthIdsFromServiceId = async (serviceId: number): Promise<number[]> => {
        try {
            const response: Response = await requestApi(`${process.env.NEXT_PUBLIC_API}/area/getOauthIdsFromServiceId/${serviceId}`, "GET", null)

            const oauthIds: number[] = await response.json();
            console.log("oauthIds", oauthIds);
            return oauthIds;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /**
     * @function getOauthIdsFromActionId
     * @description get oauthIds, based on actionId
     * @returns {Promise<number[]>}
     * @memberof actionReactionJsonDataService
     */
    export const getOauthIdsFromActionId = async (actionId: number): Promise<number[]> => {
        try {
            const response: Response = await requestApi(`${process.env.NEXT_PUBLIC_API}/area/getOauthIdsFromActionId/${actionId}`, "GET", null)

            const oauthIds: number[] = await response.json();
            console.log("oauthIds", oauthIds);
            return oauthIds;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    /**
     * @function getOauthIdsFromReactionId
     * @description get oauthIds, based on reactionId
     * @returns {Promise<number[]>}
     * @memberof actionReactionJsonDataService
     */
    export const getOauthIdsFromReactionId = async (reactionId: number): Promise<number[]> => {
        try {
            const response: Response = await requestApi(`${process.env.NEXT_PUBLIC_API}/area/getOauthIdsFromReactionId/${reactionId}`, "GET", null)

            const oauthIds: number[] = await response.json();
            console.log("oauthIds", oauthIds);
            return oauthIds;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default actionReactionJsonDataService;
