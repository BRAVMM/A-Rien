import * as React from 'react';
import {
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginMicrosoft() {
// Endpoint
const discovery = useAutoDiscovery(
  process.env.EXPO_PUBLIC_MICROSOFT_AUTHORIZE ?? '',
);
const redirectUri = makeRedirectUri({
  scheme: 'myapp',
  path: 'home',
});
const clientId = process.env.EXPO_PUBLIC_MICROSOFT_CLIENT_ID ?? '';

const REGISTER_TOKEN_ROUTE = "/services/microsoft/registerToken";

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      redirectUri,
      usePKCE: false,
      extraParams: {
        prompt: 'select_account'
      },
    },
    discovery,
  );

  const apiCall = async (code: string) => {
    try {
      const bearer = await AsyncStorage.getItem("token")

      const response = await fetch(process.env.EXPO_PUBLIC_API_URL + REGISTER_TOKEN_ROUTE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${bearer}`,
        },
        body: JSON.stringify({code: code, mobile: true}),
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
      const { code } = response.params;

      apiCall(code)
    }
  }, [response]);

  return (
      <Button
        /* @end */
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
  );
}
