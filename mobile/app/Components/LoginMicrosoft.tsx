import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
import { withExpoSnack } from "nativewind";
import * as React from "react";

import BravmmButton from "./BravmmButton";
import colors from "../../constants/Colors";

const LoginMicrosoft = () => {
  // Endpoint
  const discovery = useAutoDiscovery(
    process.env.EXPO_PUBLIC_MICROSOFT_AUTHORIZE ?? "",
  );
  const redirectUri = makeRedirectUri({
    scheme: "myapp",
    path: "profile",
  });
  const clientId = process.env.EXPO_PUBLIC_MICROSOFT_CLIENT_ID ?? "";
  const REGISTER_TOKEN_ROUTE = "/services/microsoft/registerToken";
  const [, setFetchError] = React.useState<boolean>(false);

  const [, , promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ["openid", "profile", "email", "offline_access", "email", "user.read", "mail.read", "mail.send", "ChannelMessage.Send", "mail.readwrite", "files.read", "chat.readbasic", "chat.read", "chat.readwrite"],
      redirectUri,
      usePKCE: false,
      extraParams: {
        prompt: "select_account",
      },
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
      return response.ok;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleLogin = async () => {
    const response = await promptAsync();

    if (response?.type === "success") {
      const { code } = response.params;
      if (code) {
        if (!(await apiCall(code))) {
          setFetchError(false);
        }
      }
    }
  };

  return (
    <BravmmButton
      title="Connect to Microsoft"
      onPress={handleLogin}
      color={colors.app.spotifyDarkColor}
      fontSize={20}
      img={require("../../assets/images/logos/Microsoft_logo.png")}
      iconOrImgSize={40}
    />
  );
};

export default withExpoSnack(LoginMicrosoft);
