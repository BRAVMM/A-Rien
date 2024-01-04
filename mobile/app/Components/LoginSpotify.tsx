import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, Prompt } from 'expo-auth-session';
import { Button } from 'react-native';
import { registerTokenService } from '../Services/callApi';
import { SpotifyDataBody } from '../Interface/dataBody.interface';

const REGISTER_TOKEN_ROUTE = "/services/spotify/registerToken";

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function App() {
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
            scheme: 'myapp'
          }),
        },
        discovery,
    );

    const apiCall = async (code: string) => {
      try {
        const bearer = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcwNDM2MzA1MiwiZXhwIjoxNzA0MzY2NjUyfQ.AB6MVOMmBa7UODygKuQgI7hRfUsq6W3AZh-j20mHVLU"

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
