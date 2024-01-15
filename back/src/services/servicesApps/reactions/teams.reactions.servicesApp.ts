import { OAuthService } from "../../oauth.service";

namespace TeamsReactions {
    export const reactionTeamsSendMessage = async (ownerId: number, oauthId: number, actionData: JSON, reactionData: JSON): Promise<boolean> => {

        const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
        if (oauthToken === null) {
            console.error("OAuth token not found");
            return false
        }
        const reactionDataParsed: any = JSON.parse(reactionData.toString());
        const convName = reactionDataParsed[0].convName;
        const message = reactionDataParsed[1].message;

        const urlChats = `https://graph.microsoft.com/v1.0/me/chats`;
        const responseChat = await fetch(urlChats, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${oauthToken}`,
                'Content-Type': 'application/json'
            },
        });
        console.log("responseChat = ", responseChat);
        if (!responseChat.ok) {
            throw new Error(`Error: ${responseChat.status}`);
        }
        const data = await responseChat.json();
        console.log("data = ", data);
        if (data.value) {
            console.log(data.value);
            const elem = data.value.find((element: { topic: string; }) => {
                console.log(element.topic, convName);
                return element.topic === convName;
            });
            if (elem) {
                try {
                    const urlSend = `https://graph.microsoft.com/v1.0/me/chats/${elem.id}/messages`
                    const messageBody = {
                        "body": {
                            "contentType": "Text",
                            "content": message.toString()
                        }
                    }
                    const responseSend = await fetch(urlSend, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${oauthToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(messageBody)
                    });
                    if (!responseSend.ok) {
                        console.log(await responseSend.text())
                        throw new Error(`Error: ${responseSend.status}`);
                    }
                } catch (error) {
                    console.error(error);
                    return false;
                }
            }
        } else {
            return false;
        }
        return true;
    }

    export const reactionTeamsSendMessageInTeamChannel = async (ownerId: number, oauthId: number, actionData: JSON, reactionData: JSON): Promise<boolean> => {
        const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);
        if (oauthToken === null) {
            console.error("OAuth token not found");
            return false
        }
        const reactionDataParsed: any = JSON.parse(reactionData.toString());

        const convName = reactionDataParsed[0].convName;
        const message = reactionDataParsed[1].message;

        const channelPattern = /\/channel\/([^\/]+)\//;
        const teamPattern = /groupId=([^&]+)/;

        const channelMatch = convName.match(channelPattern);
        const teamMatch = convName.match(teamPattern);

        if (!channelMatch || !teamMatch) {
            return false
        }

        const teamId = decodeURIComponent(teamMatch[1])
        const channelId = decodeURIComponent(channelMatch[1])

        const requestUrl = `https://graph.microsoft.com/v1.0/teams/${teamId}/channels/${channelId}/messages`;

        const messageData = {
            body: {
                contentType: "text",
                content: message.toString()
            }
        };

        const response = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${oauthToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageData)
        });

        if (!response.ok) {
            console.error("Erreur lors de l'envoi du message:", response.statusText);
            return false;
        }
        return true;
    }
}

export {TeamsReactions};
