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
        // await registerTokenService(new SpotifyDataBody(code), REGISTER_TOKEN_ROUTE);
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
