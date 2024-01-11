/**
 * @fileOverview Outlook reactions services
 */

/* Services */
import { OAuthService } from "../../oauth.service";

/**
 * @namespace OutlookReactions
 * @description Outlook reactions services
 */
namespace OutlookReactions {
    /**
     * Add a song to a playlist
     * @param ownerId - The id of the owner
     * @param oauthId - The id of the OAuth
     * @param actionData - The action data
     * @param reactionData - The reaction data
     * @returns {Promise<boolean>} - The result of the reaction
     */
    export const reactionOutlookSendEmail = async (ownerId: number, oauthId: number, actionData: JSON, reactionData: JSON): Promise<boolean> => {
        const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
        if (oauthToken === null) {
            console.error("OAuth token not found");
            return false;
        }

        const apiUrl = 'https://graph.microsoft.com/v1.0/me/sendMail';
        const actionDataParsed: any = actionData;
        const reactionDataParsed: any = JSON.parse(reactionData.toString());
        const emailPayload = reactionDataParsed[0].emailPayload;
        const message = reactionDataParsed[1].message;

        const headers = new Headers({
            'Authorization': `Bearer ${oauthToken}`,
            'Content-Type': 'application/json',
        });
        const emailData = {
            "message": {
                "subject": "Meet for lunch?",
                "body": {
                    "contentType": "Text",
                    "content": message.toString()
                },
                "toRecipients": [
                    {
                        "emailAddress": {
                            "address": emailPayload.toString()
                        }
                    }
                ]
            },
            "saveToSentItems": "true"
        }
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(emailData),
        });
        if (!response.ok) {
            console.error("Error sending email");
            return false;
        }
        return true;
    }


    /**
     * Add a song to a playlist
     * @param ownerId - The id of the owner
     * @param oauthId - The id of the OAuth
     * @param actionData - The action data
     * @param reactionData - The reaction data
     * @returns {Promise<boolean>} - The result of the reaction
     */

    export const reactionOutlookCreateFolder = async (ownerId: number, oauthId: number, actionData: JSON, reactionData: JSON): Promise<boolean> => {
        const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
        if (oauthToken === null) {
            console.error("OAuth token not found");
            return false;
        }

        const apiUrl = 'https://graph.microsoft.com/v1.0/me/mailFolders';
        const actionDataParsed: any = actionData;
        const reactionDataParsed: any = JSON.parse(reactionData.toString());
        const folderName = reactionDataParsed[0].folderName;

        const headers = new Headers({
            'Authorization': `Bearer ${oauthToken}`,
            'Content-Type': 'application/json',
        });
        const folderData = {
                "displayName": folderName.toString(),
                "isHidden": false,
        }
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(folderData),
        });
        console.log(response);
        if (!response.ok) {
            console.error("Error creating folder");
            return false;
        }
        return true;
    }
}

export { OutlookReactions };