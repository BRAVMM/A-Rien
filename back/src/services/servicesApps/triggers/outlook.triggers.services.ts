/**
 * @fileOverview Outlook Triggers ServicesApp
 */


import {OutlookTriggerData} from "../../../interfaces/outlook.interface";
import {OAuthService} from "../../oauth.service";

import {TRIGGER_DATA_TYPE} from "../APIActionReaction.servicesApps";

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

    function getOrCreateUserData(ownerId: number): { userData: OutlookTriggerData } {
        const userId = ownerId.toString();
        if (!userMicrosoftTriggerData[ownerId]) {
            userMicrosoftTriggerData[ownerId] = {
                userId: userId,
                numberOfMails: 0,
                subjectOfEmail: "",
                isNew: true,
            };
        }
        return {userData: userMicrosoftTriggerData[ownerId]};
    }

    async function getOutlookNumberOfMailsFromGraphAPI(oauthId: number, ownerId: number): Promise<
        {
            numberOfMails: number,
            subjectOfLastEmail: string
        }> {
        let subject: string = "";
        let numberOfMails: number = 0;
        let json: any;

        try {
            json = await fetchWithOAuth(oauthId, MICROSFT_GRAPH_API_URL + "me/messages?$count=true", ownerId);
        } catch (error) {
            console.error(error);
            return {numberOfMails: 0, subjectOfLastEmail: ""};
        }
        if (!json.value) {
            return {numberOfMails: 0, subjectOfLastEmail: ""};
        }
        console.log(json);
        console.log(json["@odata.count"]);

        numberOfMails = json["@odata.count"];
        subject = json.value[0].subject;
        return {numberOfMails: numberOfMails, subjectOfLastEmail: subject};
    }


    export const checkOutlookNewEmail = async (ownerId: number, oauthId: number): Promise<{
        result: boolean,
        data: any
    }> => {
        try {
            const {userData} = getOrCreateUserData(ownerId);
            const {numberOfMails, subjectOfLastEmail}  = await getOutlookNumberOfMailsFromGraphAPI(oauthId, ownerId);

            console.log("newLength", numberOfMails);
            console.log("userData.subjectOfEmail", userData.subjectOfEmail);
            if (userData.numberOfMails < numberOfMails) {
                userData.numberOfMails = numberOfMails;
                userData.subjectOfEmail = subjectOfLastEmail;
                if (userData.isNew) {
                    userData.isNew = false;
                    return {result: false, data: null};
                }
                return {result: true, data: null};
            }
            userData.numberOfMails = numberOfMails;
            userData.subjectOfEmail = subjectOfLastEmail;
            return {result: false, data: null};
        } catch (error) {
            console.error(error);
            return {result: false, data: {}};
        }
    }
}

export {OutlookTriggers};
