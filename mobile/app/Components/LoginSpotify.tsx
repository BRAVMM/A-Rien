import * as React from 'react';
import { AuthSessionResult, makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      scopes: ["user-read-email", "playlist-modify-public"],
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
      <StyledView>
        <Button
          /* @end */
          title="Login"
          onPress={handleLogin}
        />
        {fetchError && <StyledText className="text-red-600">Error login failed.</StyledText>}
    </StyledView>
    );
}

export default withExpoSnack(LoginSpotify);
