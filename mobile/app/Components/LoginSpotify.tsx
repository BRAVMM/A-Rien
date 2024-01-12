import AsyncStorage from "@react-native-async-storage/async-storage";
import {makeRedirectUri, useAuthRequest} from "expo-auth-session";
import * as React from "react";
import {FadeLoading} from "react-native-fade-loading";
import BravvmButton from "./BravvmButton";
import AnimatedBackground from "./AnimatedBackground";
import colors from "../../constants/Colors";

const REGISTER_TOKEN_ROUTE = "/services/spotify/registerToken";

const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const LoginSpotify = () => {
    const clientID: string = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID ?? "";

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: clientID,
            scopes: ["user-read-email", "playlist-modify-public"],
            usePKCE: false,
            extraParams: {
                show_dialog: "true",
            },
            redirectUri: makeRedirectUri({
                scheme: "myapp",
                path: "home",
            }),
        },
        discovery,
    );

    const apiCall = async (code: string) => {
        try {
            const bearer = await AsyncStorage.getItem("token");

            const response = await fetch(
                process.env.EXPO_PUBLIC_API_URL + REGISTER_TOKEN_ROUTE,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${bearer}`,
                    },
                    body: JSON.stringify({code, mobile: true}),
                },
            );
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        if (response?.type === "success") {
            const {code} = response.params;

            apiCall(code).then((r) => r);
        }
    }, [response]);

    return (
        request ? (
            <BravvmButton
                title="Connect to Spotify"
                onPress={() => {
                    promptAsync();
                }}
                color={colors.app.spotifyDarkColor}
                fontSize={20}
                img={require("../../assets/images/logos/Spotify_logo.png")}
                iconOrImgSize={40}
            />
        ) : (
            <FadeLoading primaryColor={colors.light.primary} secondaryColor={colors.light.fourthly}
                         animated={true}
                         duration={20000}
                         style={{
                             flex: 1,
                             width: "100%",
                             height: "100%",
                             position: "absolute",
                             top: 0,
                             left: 0,
                             opacity: 0.3
                         }}
                         visible={true}
                         children={<></>}
            />
        )
    );
}

export default LoginSpotify;
