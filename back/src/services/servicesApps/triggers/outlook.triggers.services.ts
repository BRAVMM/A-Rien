/**
 * @fileOverview Spotify Triggers ServicesApp
 */


import { OutlookTriggerData } from "../../../interfaces/outlook.interface";
import { OAuthService } from "../../oauth.service";

import { TRIGGER_DATA_TYPE } from "../APIActionReaction.servicesApps";

const MICROSFT_GRAPH_API_URL = "https://graph.microsoft.com/v1.0/";
const userMicrosoftTriggerData: Record<string, OutlookTriggerData> = {};

/**
 * @namespace OutlookTriggers
 * @description Outlook Triggers ServicesApp
 */

namespace OutlookTriggers {

    async function fetchWithOAuth(oauthId: number, url: string, ownerId: number): Promise<any> {
        const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
        if (!oauthToken) {
            throw new Error("No token found");
        }
        try {
            const response: Response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + oauthToken,
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Error fetching data from Microsoft Graph API");
        }
            const json: any = await response.json();
            return json;
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    function getOrCreateUserData(ownerId: number): { userData: OutlookTriggerData, isNew: boolean } {
        const userId = ownerId.toString();
        if (!userMicrosoftTriggerData[ownerId]) {
            userMicrosoftTriggerData[ownerId] = {
                userId: userId,
                subjectOfEmail: "",
            };
            return { userData: userMicrosoftTriggerData[ownerId], isNew: true };
        }
        return { userData: userMicrosoftTriggerData[ownerId], isNew: false };
    }

    async function getOutlookEmailsSubjectsFromGraphAPI(oauthId: number, ownerId: number): Promise<string> {
        let subject: string = "";
        let json: any;

        try {
            json = await fetchWithOAuth(oauthId, MICROSFT_GRAPH_API_URL + "me/messages", ownerId);
        } catch (error) {
            console.error(error);
            return "";
        }
        if (!json.value) {
            return "";
        } 
        subject = json.value[0].subject;
        return subject;
    }


    export const checkOutlookNewEmail = async (ownerId: number, oauthId: number): Promise<{ result: boolean, data: any }> => {
        try {
            const { userData, isNew } = getOrCreateUserData(ownerId);
            const newLength = await getOutlookEmailsSubjectsFromGraphAPI(oauthId, ownerId);

            if (userData.subjectOfEmail !== newLength) {
                userData.subjectOfEmail = newLength;
                return { result: true, data: null };
            }
            return {result: false, data: null};
        }
        catch (error) {
            console.error(error);
            return { result: false, data: {} };
        }
    }
}

export { OutlookTriggers };
