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
    
        function getOrCreateUserData(ownerId: number): { userData: OneDriveTriggerData, isNew: boolean } {
            const userId = ownerId.toString();
            if (!userMicrosoftTriggerData[ownerId]) {
                userMicrosoftTriggerData[ownerId] = {
                    userId: userId,
                    id: "",
                };
                return { userData: userMicrosoftTriggerData[ownerId], isNew: true };
            }
            return { userData: userMicrosoftTriggerData[ownerId], isNew: false };
        }
    
        async function getOneDriveFileFromGraphAPI(oauthId: number, ownerId: number): Promise<string> {
            let fileId: string = "";
        
            try {
                const response = await fetchWithOAuth(oauthId, "https://graph.microsoft.com/v1.0/me/drive/root/children", ownerId);
                const json = response;
        
                if (json.value && json.value.length > 0) {
                    const sortedFiles = json.value.sort((a: any, b: any) => {
                        return new Date(b.createdDateTime).getTime() - new Date(a.createdDateTime).getTime();
                    });
        
                    fileId = sortedFiles[0].id;
        
                }
            } catch (error) {
                console.error('Error:', error);
            }
        
            return fileId;
        }
        
        
    
        
        /**
        * @function getTriggerData
        * @description Get the trigger data of a Outlook
        */
        export const getTriggerData = async (ownerId: number, oauthId: number): Promise<{ result: boolean, data: any }> => {
            try {
                const { userData, isNew } = getOrCreateUserData(ownerId);
                const newId = await getOneDriveFileFromGraphAPI(oauthId, ownerId);
                
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