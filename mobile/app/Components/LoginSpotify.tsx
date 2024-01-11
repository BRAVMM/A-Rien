import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as React from "react";
import { Button } from "react-native";

const REGISTER_TOKEN_ROUTE = "/services/spotify/registerToken";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function App() {
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
          body: JSON.stringify({ code, mobile: true }),
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
      const { code } = response.params;

      apiCall(code).then((r) => r);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync().then((r) => r);
      }}
    />
  );
}
