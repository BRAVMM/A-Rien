/**
 * @fileOverview OneDrive Triggers ServicesApp
 */

import { OneDriveTriggerData } from "../../../interfaces/onedrive.interface";
import { OAuthService } from "../../oauth.service";

import { TRIGGER_DATA_TYPE } from "../APIActionReaction.servicesApps";

const MICROSFT_GRAPH_API_URL = "https://graph.microsoft.com/v1.0/";
const userMicrosoftTriggerData: Record<string, OneDriveTriggerData> = {};

/**
 * @namespace OneDriveTriggers
 * @description OneDrive Triggers ServicesApp
 */

namespace OneDriveTriggers {
    
        async function fetchWithOAuth(oauthId: number, url: string, ownerId: number): Promise<any> {
            const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
            if (!oauthToken) {
                throw new Error("No token found");
            }
            console.log('url', url);
            try {
                const response: Response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + oauthToken,
                    "Content-Type": "application/json"
                }
            });
            console.log(response);
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
    
        function getOrCreateUserData(ownerId: number): { userData: OneDriveTriggerData, isNew: boolean } {
            const userId = ownerId.toString();
            if (!userMicrosoftTriggerData[ownerId]) {
                userMicrosoftTriggerData[ownerId] = {
                    userId: userId,
                    id: ""
                };
                return { userData: userMicrosoftTriggerData[ownerId], isNew: true };
            }
            return { userData: userMicrosoftTriggerData[ownerId], isNew: false };
        }
    
        async function getOneDriveFileFromGraphAPI(oauthId: number, ownerId: number): Promise<string> {
            let value: string = "";
            
            try {
                const response = await fetchWithOAuth(oauthId, "https://graph.microsoft.com/v1.0/me/drive/root/children", ownerId);
                
                if (!response.ok) {
                    console.error('Error:', response.statusText);
                    return value;
                }
        
                const json = await response.json();
        
                if (json.value && json.value.length > 0) {
                    // Utilisez la dernière valeur plutôt que la première
                    value = json.value[json.value.length - 1].id;
                }
            } catch (error) {
                console.error('Error:', error);
            }
        
            return value;
        }
        
    
        
        /**
        * @function getTriggerData
        * @description Get the trigger data of a Outlook
        */
        export const getTriggerData = async (ownerId: number, oauthId: number): Promise<{ result: boolean, data: any }> => {
            try {
                const { userData, isNew } = getOrCreateUserData(ownerId);
                const newId = await getOneDriveFileFromGraphAPI(oauthId, ownerId);
                console.log("je passe par las");
                if (isNew || userData.id !== newId) {
                    userData.id = newId;
                    return { result: true, data: userData };
                }
                return { result: false, data: userData };
            }
            catch (error) {
                console.error(error);
                return { result: false, data: {} };
            }
        }
            
}

export { OneDriveTriggers };