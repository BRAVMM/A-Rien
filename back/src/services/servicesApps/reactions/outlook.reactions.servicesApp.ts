/**
 * @fileOverview Outlook reactions services
 */

/* Services */
import {OAuthService} from "../../oauth.service";

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
        console.log("azeazeazezaeazeazezaezaezaeeazeaz");
        const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
        console.log(oauthId);
        console.log(ownerId);
        console.log("azeazeazezaeazeazezaezaezaeeazeaz");
        if (oauthToken === null) {
            console.error("OAuth token not found");
            return false;
        }

        const apiUrl = 'https://graph.microsoft.com/v1.0/me/sendMail';
        const actionDataParsed: any = actionData;
        const reactionDataParsed: any = JSON.parse(JSON.stringify(reactionData));
        const emailPayload = reactionDataParsed[0].emailPayload;
        const message = reactionDataParsed[1].message;

        const headers = new Headers({
            'Authorization': `Bearer ${oauthToken}`,
            'Content-Type': 'application/json',
        });

        const emailData = {
            "message": {
                "subject": emailPayload,
                "body": {
                    "contentType": "Text",
                    "content": message
                },
                "toRecipients": [
                    {
                        "emailAddress": {
                            "address": emailPayload
                        }
                    }
                ]
            },
            "saveToSentItems": "false"
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(emailData),
        });

        const data = await response.json();

        console.log(data);
        console.log(actionData);
        console.log(reactionData);
        return true;
    }
}

export {OutlookReactions};