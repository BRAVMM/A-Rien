import AsyncStorage from "@react-native-async-storage/async-storage";
import {makeRedirectUri, useAuthRequest} from "expo-auth-session";
import * as React from "react";
import {FadeLoading} from "react-native-fade-loading";
import BravvmButton from "./BravvmButton";
import AnimatedBackground from "./AnimatedBackground";
import colors from "../../constants/Colors";
import { Button, Text, View } from 'react-native';
import { styled, withExpoSnack } from 'nativewind';

const REGISTER_TOKEN_ROUTE = "/services/spotify/registerToken";

const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const StyledView = styled(View);
const StyledText = styled(Text);

const LoginSpotify = () => {
    const clientID: string = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID ?? ''
    const [fetchError, setFetchError] = React.useState<boolean>(false)

  const [request, _, promptAsync] = useAuthRequest(
    {
      clientId: clientID,
        scopes: ["user-read-private", "user-read-email", "playlist-read-private", "playlist-read-collaborative", "playlist-modify-private", "playlist-modify-public", "user-follow-read", "user-library-read", "user-library-modify", "user-top-read", "user-read-recently-played"],
      usePKCE: false,
      extraParams: {
        show_dialog: "true",
      },
      redirectUri: makeRedirectUri({
        scheme: "myapp",
        path: "profile",
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
          body: JSON.stringify({code: code, mobile: true}),
        });
        if (!response.ok) {
          const error = await response.json();
          return false
        }
        return true
      } catch (error) {
        console.error(error)
        return false
      }
  };

  const handleLogin = (async () => {
    const response = await promptAsync();

    if (response?.type === "success") {
      const { code } = response.params
        if (code) {
          if (!await apiCall(code)) {
            setFetchError(false)
          }
        }
      }
  })

    return (
        <BravvmButton
            title="Connect to Spotify"
            onPress={handleLogin}
            color={colors.app.spotifyDarkColor}
            fontSize={20}
            img={require("../../assets/images/logos/Spotify_logo.png")}
            iconOrImgSize={40}
        />
    );
}

export default withExpoSnack(LoginSpotify);
