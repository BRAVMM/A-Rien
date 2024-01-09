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
            const reactionDataParsed: any = JSON.parse(reactionData.toString());
            // TODO: get guildId from reactionDataParsed
            const guildId: string | null = "";
            if (!process.env.DISCORD_API_ENDPOINT) {
                console.error("Discord API endpoint not found");
                return false;
            }
            const response = await fetch(`${process.env.DISCORD_API_ENDPOINT}/${guildId}/${oauthToken}`, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + oauthToken
                },
                body: JSON.stringify({
                    content: "ping"
                })
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }
            const json = await response.json();
            console.log("success adding random song to playlist: ", json);
        } catch (e) {
            console.error("Error in reactionSpotifyAddToPlaylist:", e);
            return false;
        }
        return true;
    }
}

export { DiscordReactions };
