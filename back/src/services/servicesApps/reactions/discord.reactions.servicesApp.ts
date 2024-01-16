/**
 * @fileOverview Discord reactions services
 */

/* Services */
import { OAuthService } from "../../oauth.service";

/* API Action Reaction Services Apps */
import { TRIGGER_DATA_TYPE } from "../APIActionReaction.servicesApps";

/**
 * @namespace DiscordReactions
 * @description Discord reactions services
 */
namespace DiscordReactions {
    export const reactionDiscordSendMessage = async (ownerId: number, oauthId: number, actionData: JSON, reactionData: JSON): Promise<boolean> => {
        try {
            const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
            if (oauthToken === null) {
                console.error("OAuth token not found");
                return false;
            }
            if (!process.env.DISCORD_API_ENDPOINT) {
                console.error("Discord API endpoint not found");
                return false;
            }
            const oAuthData: any | undefined = await OAuthService.getOAuthDataFromId(oauthId, ownerId);
            const guildId: string | null = oAuthData?.guildId;
            const webhookId: string | null = oAuthData?.webhookId;
            const token: string | null = oAuthData?.token;
            const url: string | null = oAuthData?.url;
            const reactionDataParsed: any = JSON.parse(reactionData.toString())[0];
            console.log("reactionDataParsed = ", reactionDataParsed)

            if (!guildId || !webhookId || !token || !url) {
                return false;
            }

            console.log(`${process.env.DISCORD_API_ENDPOINT}/webhooks/${webhookId}/${token}`);
            console.log("url = ", url)
            const message: string = reactionDataParsed.message;
            console.log("message = ", message);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: message
                })
            });
            console.log("response: ", response);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }
        } catch (e) {
            console.error("Error in discord:", e);
            return false;
        }
        return true;
    }
}

export { DiscordReactions };
