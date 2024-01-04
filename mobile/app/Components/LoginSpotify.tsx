import * as React from 'react';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';
import { useRoute } from '@react-navigation/native';

const REGISTER_TOKEN_ROUTE = "/services/spotify/registerToken";

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function App() {
    const route = useRoute()
    const clientID: string = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID ?? ''

    const [request, response, promptAsync] = useAuthRequest(
        {
          clientId: clientID,
          scopes: ['user-read-email', 'playlist-modify-public'],
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

    const apiCall = async (code: string) => {
      try {
        const bearer = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcwNDQwODUzOCwiZXhwIjoxNzA0NDEyMTM4fQ.ey93KsJNwDmFNq8xZsqmAFTdpXXRVcVGn2aHlzjZHV0"

        const response = await fetch(process.env.EXPO_PUBLIC_API_URL + REGISTER_TOKEN_ROUTE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearer}`,
          },
          body: JSON.stringify({code: code}),
        });
        console.log(response)
        if (!response.ok) {
          const error = await response.json();
          console.log(error)
          throw new Error(error.error);
        }
      } catch (error) {
        console.log(error)
      }
    } 

    React.useEffect(() => {
      console.log(route.name)
      console.log(makeRedirectUri({
        scheme: 'myapp',
        path: 'home'
      }))
      if (response?.type === 'success') {
        const { code } = response.params;

        try {
          apiCall(code)
        } catch(error) {
            console.log(error)
        }
      }
    }, [response]);

    return (
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    );
}
