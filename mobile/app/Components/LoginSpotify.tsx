import { useNavigation } from "expo-router";
import { withExpoSnack, styled } from "nativewind";
import React, { useEffect, useState } from "react";
import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Login = () => {
    const base64encode = (input: number): string => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }   
    const sha256 = async (plain: string): Promise<ArrayBuffer> => {
        const encoder: TextEncoder = new TextEncoder()
        const data: Uint8Array = encoder.encode(plain)
        return window.crypto.subtle.digest('SHA-256', data)
    }

    const generateRandomString = (length: number) => {
        const possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values: Uint8Array = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }

    const requestSpotify = async (codeVerifier: string) => {
        try {
            const hashed = await sha256(codeVerifier)
            const codeChallenge = base64encode(hashed);
        } catch (error) {

        }
    }

    useEffect(() => {
        const codeVerifier: string = generateRandomString(64);

    }
    , []);


    return (
        <StyledView>

        </StyledView>
    );
};

export default withExpoSnack(Login);
