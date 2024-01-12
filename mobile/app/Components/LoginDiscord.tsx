import * as React from 'react';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REGISTER_TOKEN_ROUTE = "/services/discord/registerToken";

const discovery = {
    authorizationEndpoint: 'https://discord.com/oauth2/authorize',
    tokenEndpoint: 'https://accounts.discord.com/api/token',
};

export default function App() {
    const route = useRoute()
    const clientID: string = process.env.EXPO_PUBLIC_DISCORD_CLIENT_ID ?? ''

    console.log("redirectUri" + makeRedirectUri({
        scheme: 'myapp',
        path: 'home'
    }));
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: clientID,
            scopes: ['webhook.incoming'],
            usePKCE: false,
            extraParams: {
                show_dialog: 'true'
            },
            redirectUri: makeRedirectUri({
                scheme: 'myapp',
                path: 'home'
            }),
        },
        discovery,
    );

    const apiCall = async (code: string, guildId: string) => {
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

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { code, guildId } = response.params;

            apiCall(code, guildId)
        }
    }, [response]);

    return (
        <View style={{backgroundColor: "blue", flex: 1 ,  justifyContent: 'center', alignItems: 'center', }}>
            <Button
                disabled={!request}
                title="Login"
                onPress={() => {
                    promptAsync();
                    console.log("Login")
                }}
            />
        </View>
    );
}
