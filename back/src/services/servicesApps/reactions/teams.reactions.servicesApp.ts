import { getMicrosoftUserId } from "../../API/Microsoft/getUserId.services";
import { OAuthService } from "../../oauth.service";

namespace TeamsReactions {
    export const reactionTeamsSendMessage = async (ownerId: number, oauthId: number, actionData: JSON, reactionData: JSON): Promise<boolean> => {
        const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
        if (oauthToken === null) {
            console.error("OAuth token not found");
            return false
        }
        const reactionDataParsed: any = JSON.parse(reactionData.toString());
        const emailPayload = reactionDataParsed[0].emailPayload;
        const message = reactionDataParsed[1].message;
        const userId = await getMicrosoftUserId(emailPayload, oauthToken)

        if (userId === null) {
            console.error("User not found");
            return false
        }

        const url = `https://graph.microsoft.com/v1.0/users/${userId}/chats`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${oauthToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                body: {
                    contentType: 'text',
                    content: message
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        
        return true;
    }
}

export {TeamsReactions};
