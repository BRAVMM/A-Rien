import { useNavigation } from "expo-router";
import { withExpoSnack, styled } from "nativewind";
import React, { useEffect, useState } from "react";
import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import { encode as base64encode } from 'base-64'
import * as Crypto from 'expo-crypto';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

// https://medium.com/@zachrach/spotify-web-api-authorization-with-react-native-expo-6ee1a290b2b0

const Login = () => {
    const [codeVerifier, setCodeVerifier] = useState('')

    const base64EncodeArrayBuffer = (arrayBuffer: ArrayBuffer): string => {
        const uint8Array = new Uint8Array(arrayBuffer);
        const binaryString = Array.from(uint8Array).map(byte => String.fromCharCode(byte)).join('');
        return base64encode(binaryString)
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    };

    const sha256 = async (plain : string) => {
        return await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            plain
        );
    };

    const hexToBuffer = (hexString: string): ArrayBuffer => {
        const length = hexString.length / 2;
        const buffer = new ArrayBuffer(length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < length; i++) {
            view[i] = parseInt(hexString.substring(i * 2, i * 2 + 2), 16);
        }
        return buffer;
    }

    const generateRandomString = (length: number) => {
        const possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values: Uint8Array = Crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }

    const requestSpotify = async (codeVerifier: string) => {
        try {
            const hashed: ArrayBuffer = await sha256(codeVerifier).then(sha256Str => {
                return hexToBuffer(sha256Str)
            })
            const codeChallenge: string = base64EncodeArrayBuffer(hashed);

            const clientId = 'e26ebc5f1b89467fb4752a8a3e2012b8';
            const redirectUri = 'http://localhost:3000/services';

            const scope = 'user-read-private user-read-email';
            const authUrl = new URL("https://accounts.spotify.com/authorize")

            // generated in the previous step
            window.localStorage.setItem('code_verifier', codeVerifier);

            const params =  {
              response_type: 'code',
              client_id: clientId,
              scope,
              code_challenge_method: 'S256',
              code_challenge: codeChallenge,
              redirect_uri: redirectUri,
            }

            authUrl.search = new URLSearchParams(params).toString();
            window.location.href = authUrl.toString();
        } catch (error: any) {
            console.log(error.message);
            throw new Error("Unable to generate code challenge");
        }
    }

    useEffect(() => {
        const randomStr: string = generateRandomString(64);

        setCodeVerifier(randomStr)
    }
    , []);


    return (
        <StyledView>
            <StyledTouchableOpacity onPress={() =>{ requestSpotify(codeVerifier)}}>
                <StyledText>Login</StyledText>
            </StyledTouchableOpacity>
        </StyledView>
    );
};

export default withExpoSnack(Login);
