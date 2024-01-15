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
    
        function getOrCreateUserData(ownerId: number): { userData: OneDriveTriggerData } {
            const userId = ownerId.toString();
            if (!userMicrosoftTriggerData[ownerId]) {
                userMicrosoftTriggerData[ownerId] = {
                    userId: userId,
                    id: "",
                    folderLength: 0,
                    isNew: true
                };
            }
            return { userData: userMicrosoftTriggerData[ownerId]};
        }
    
        async function getOneDriveNumberOfChildsFromGraphAPI(oauthId: number, ownerId: number): Promise<number> {
            let numberOfChilds: number = 0;
        
            try {
                const response = await fetchWithOAuth(oauthId, "https://graph.microsoft.com/v1.0/me/drive/root", ownerId);
                const json = response;

                numberOfChilds = json.folder.childCount;
            } catch (error) {
                console.error('Error:', error);
            }
        
            return numberOfChilds;
        }
        
        
    
        
        /**
        * @function getTriggerData
        * @description Get the trigger data of a Outlook
        */
        export const getTriggerData = async (ownerId: number, oauthId: number): Promise<{ result: boolean, data: any }> => {
            try {
                const { userData } = getOrCreateUserData(ownerId);
                const length = await getOneDriveNumberOfChildsFromGraphAPI(oauthId, ownerId);

                if (userData.folderLength < length) {
                    userData.folderLength = length;
                    if (userData.isNew) {
                        userData.isNew = false;
                        return {result: false, data: null};
                    }
                } else {
                    userData.folderLength = length;
                    return {result: false, data: null};
                }
                return { result: true, data: userData };
            }
            catch (error) {
                console.error(error);
                return { result: false, data: {} };
            }
        }
            
}

export { OneDriveTriggers };