import * as React from 'react';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

const AUTH_ENDPOINT = "https://discord.com/oauth2/authorize";
const RESPONSE_TYPE = "code";
const REGISTER_TOKEN_ROUTE = "/services/discord/registerToken";
const REDIRECT_URI_ROUTE = "/services/discord/getCode"
const SCOPE = "webhook.incoming";

export default function App() {
    const route = useRoute();
    const CLIENT_ID: string = process.env.EXPO_PUBLIC_DISCORD_CLIENT_ID ?? '';
    const API_URL: string = process.env.EXPO_PUBLIC_API_URL ?? 'localhost:3000';
    const REDIRECT_URI: string = API_URL + REDIRECT_URI_ROUTE;
    const state: string = "1234";

    const handlePress = async () => {
        const result = await WebBrowser.openAuthSessionAsync(
            `${AUTH_ENDPOINT}?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&scope=${SCOPE}&state=${state}&redirect_uri=${REDIRECT_URI}`,
            REDIRECT_URI
        );

        if (result.type === "success") {

            // get back the params from the url
            const params = Linking.parse(result.url);
            if (!params.queryParams) {
                console.log("error: missing query params");
                return;
            }
            if (params.queryParams.error) {
                console.log("error : " + params.queryParams.error);
                return;
            }
            const code = params.queryParams.code;
            const guildId = params.queryParams.guild_id;

            if (code && guildId) {
                console.log("successfully got code and guildId");
                await apiCall(code, guildId)
            } else {
                console.log("error: missing field");
            }
        }

    }

    const apiCall = async (code: any, guildId: any) => {
        try {
            const bearer = await AsyncStorage.getItem("token")

            const response = await fetch(process.env.EXPO_PUBLIC_API_URL + REGISTER_TOKEN_ROUTE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${bearer}`,
                },
                body: JSON.stringify({ code: code, guildId: guildId, mobile: true }),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }
        } catch (error) {
            console.log(error)
            return
        }
    }

    return (
        <View style={{ backgroundColor: "blue", flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Button
                // disabled={!request}
                title="Login"
                onPress={() => {
                    handlePress();
                    console.log("Login")
                }}
            />
        </View>
    );
}
