/**
 * @fileoverview service for actionJsonData
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationProp } from "@react-navigation/native";

import {ModalDataInterface, ServiceActionInterface, ServiceReactionInterface,} from "../Interfaces/ModalData.interface";
import {AreaDetailsInterface} from "../Interfaces/areaData.interface";

/**
 * @namespace actionReactionJsonDataService
 * @description actionReactionJsonDataService
 */
namespace actionReactionJsonDataService {
  const requestApi = async (url: string, method: string, body: any, router: NavigationProp<ReactNavigation.RootParamList>) => {
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
    if (response.status === 401) {
      router.navigate("login" as never);
    }
    return response;
  };

  /**
   * @function getServices
   * @description get all services
   * @returns {Promise<ServiceActionInterface[]>}
   * @memberof actionReactionJsonDataService
   */
  export const getServices = async (router: NavigationProp<ReactNavigation.RootParamList>): Promise<ModalDataInterface[]> => {
    try {
      const response: Response = await requestApi(
        `${process.env.EXPO_PUBLIC_API_URL}/area/getServices`,
        "GET",
        null,
        router,
      );
      if (!response.ok) {
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
      router: NavigationProp<ReactNavigation.RootParamList>,
    serviceId: number,
  ): Promise<ServiceActionInterface[]> => {
    try {
      const response: Response = await requestApi(
        `${process.env.EXPO_PUBLIC_API_URL}/area/getActionsFromServiceId/${serviceId}`,
        "GET",
        null,
          router
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
      router: NavigationProp<ReactNavigation.RootParamList>,
    actionId: number,
  ): Promise<ServiceReactionInterface[]> => {
    try {
      const response: Response = await requestApi(
        `${process.env.EXPO_PUBLIC_API_URL}/area/getReactionsFromActionId/${actionId}`,
        "GET",
        null,
            router
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
      router: NavigationProp<ReactNavigation.RootParamList>,
    serviceId: number,
  ): Promise<number[]> => {
    try {
      const response: Response = await requestApi(
        `${process.env.EXPO_PUBLIC_API_URL}/area/getOauthIdsFromServiceId/${serviceId}`,
        "GET",
        null,
        router
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
      router: NavigationProp<ReactNavigation.RootParamList>,
    actionId: number,
  ): Promise<number[]> => {
    try {
      const response: Response = await requestApi(
        `${process.env.EXPO_PUBLIC_API_URL}/area/getOauthIdsFromActionId/${actionId}`,
        "GET",
        null,
        router
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
      router: NavigationProp<ReactNavigation.RootParamList>,
    reactionId: number,
  ): Promise<number[]> => {
    try {
      const response: Response = await requestApi(
        `${process.env.EXPO_PUBLIC_API_URL}/area/getOauthIdsFromReactionId/${reactionId}`,
        "GET",
        null,
        router
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

  /**
   * Retrieves the areas from the server.
   * @returns An array of AreaDetailsInterface representing the areas.
   */
  export const getAreas = async (router: NavigationProp<ReactNavigation.RootParamList>): Promise<AreaDetailsInterface[]> => {
    const _areas: AreaDetailsInterface[] = [];
    const token: string | null = await AsyncStorage.getItem("token");

    if (!token) {
      return _areas;
    }
    try {
      const response: Response = await requestApi(
          `${process.env.EXPO_PUBLIC_API_URL}/area/getAreas`,
          "GET",
          null,
          router
      );
      const data = await response.json();
      if (!response.ok) {
        console.error(data.error);
        return _areas;
      }
      if (data) {
        data.forEach((area: AreaDetailsInterface) => {
          _areas.push(area);
        });
      }
    } catch (error) {
    }
    return _areas;
  }
}

export default actionReactionJsonDataService;
