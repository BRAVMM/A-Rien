/**
 * @fileoverview service for actionJsonData
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

import {ModalDataInterface, ServiceActionInterface, ServiceReactionInterface,} from "../Interfaces/ModalData.interface";

/**
 * @namespace actionReactionJsonDataService
 * @description actionReactionJsonDataService
 */
namespace actionReactionJsonDataService {
  const requestApi = async (url: string, method: string, body: any) => {
    const bearer = await AsyncStorage.getItem("token")
    let response: Response;

    if (method === "GET") {
      response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearer}`,
        },
      });
    } else {
      response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearer}`,
        },
        body: JSON.stringify(body),
      });
    }
    return response;
  };

  /**
   * @function getServices
   * @description get all services
   * @returns {Promise<ServiceActionInterface[]>}
   * @memberof actionReactionJsonDataService
   */
  export const getServices = async (): Promise<ModalDataInterface[]> => {
    try {
      const response: Response = await requestApi(
        `${process.env.EXPO_PUBLIC_API_URL}/area/getServices`,
        "GET",
        null,
      );
      if (!response.ok) {
        console.error(
          "error getServices : ",
          response.status,
          response.statusText,
        );
        return [];
      }
      return await response.json();
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  /**
   * @function getActionJsonData
   * @description get actionJsonData, based on serviceId
   * @returns {Promise<ServiceActionInterface[]>}
   * @memberof actionReactionJsonDataService
   */
  export const getActionJsonData = async (
    serviceId: number,
  ): Promise<ServiceActionInterface[]> => {
    try {
      const response: Response = await requestApi(
        `${process.env.EXPO_PUBLIC_API_URL}/area/getActionsFromServiceId/${serviceId}`,
        "GET",
        null,
      );
      if (!response.ok) {
        console.error(
          "error getActionJsonData : ",
          response.status,
          response.statusText,
        );
        return [];
      }
      return await response.json();
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  /**
   * @function getReactionJsonData
   * @description get reactionJsonData, based on actionId
   * @returns {Promise<ServiceReactionInterface[]>}
   * @memberof actionReactionJsonDataService
   */
  export const getReactionJsonData = async (
    actionId: number,
  ): Promise<ServiceReactionInterface[]> => {
    try {
      const response: Response = await requestApi(
        `${process.env.EXPO_PUBLIC_API_URL}/area/getReactionsFromActionId/${actionId}`,
        "GET",
        null,
      );
      if (!response.ok) {
        console.error(
          "error getReactionJsonData : ",
          response.status,
          response.statusText,
        );
        return [];
      }
      return await response.json();
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  /**
   * @function getOauthIdsFromServiceId
   * @description get oauthIds, based on serviceId
   * @returns {Promise<number[]>}
   * @memberof actionReactionJsonDataService
   */
  export const getOauthIdsFromServiceId = async (
    serviceId: number,
  ): Promise<number[]> => {
    try {
      const response: Response = await requestApi(
        `${process.env.EXPO_PUBLIC_API_URL}/area/getOauthIdsFromServiceId/${serviceId}`,
        "GET",
        null,
      );
      if (!response.ok) {
        console.error(
          "error getOauthIdsFromServiceId : ",
          response.status,
          response.statusText,
        );
        return [];
      }
      return await response.json();
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  /**
   * @function getOauthIdsFromActionId
   * @description get oauthIds, based on actionId
   * @returns {Promise<number[]>}
   * @memberof actionReactionJsonDataService
   */
  export const getOauthIdsFromActionId = async (
    actionId: number,
  ): Promise<number[]> => {
    try {
      const response: Response = await requestApi(
        `${process.env.EXPO_PUBLIC_API_URL}/area/getOauthIdsFromActionId/${actionId}`,
        "GET",
        null,
      );
      if (!response.ok) {
        console.error(
          "error getOauthIdsFromActionId : ",
          response.status,
          response.statusText,
        );
        return [];
      }
      return await response.json();
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  /**
   * @function getOauthIdsFromReactionId
   * @description get oauthIds, based on reactionId
   * @returns {Promise<number[]>}
   * @memberof actionReactionJsonDataService
   */
  export const getOauthIdsFromReactionId = async (
    reactionId: number,
  ): Promise<number[]> => {
    try {
      const response: Response = await requestApi(
        `${process.env.EXPO_PUBLIC_API_URL}/area/getOauthIdsFromReactionId/${reactionId}`,
        "GET",
        null,
      );
      if (!response.ok) {
        console.error(
          "error getOauthIdsFromReactionId : ",
          response.status,
          response.statusText,
        );
        return [];
      }
      return await response.json();
    } catch (error) {
      console.log(error);
      return [];
    }
  };
}

export default actionReactionJsonDataService;
