import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { withExpoSnack, styled } from "nativewind";
import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import colors from "../constants/Colors";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const router = useNavigation();

  useEffect(() => {
    if (loginSuccess) {
      // Redirect to the home page
      router.navigate("home" as never);
    }

    // Clean-up function
    return () => {
      // Reset login state
      setLoginSuccess(false);
      // Any other clean-up actions can be placed here
    };
  }, [loginSuccess, router]);

  const handleError = (error: any) => {
    setError(error.error);
  };
  const handleSubmit = async () => {
    if (password === undefined || password === "") {
      setError("Passwords is empty");
      return;
    }

    setError("");

    const data = {
      username,
      password,
    };

    try {
      const response = await fetch(
        process.env.EXPO_PUBLIC_API_URL + "/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      if (response.ok) {
        setLoginSuccess(true);
        const token = await response.json();
        await AsyncStorage.setItem("token", token["token"]);
      } else {
        const errorResponse = await response.json();
        handleError(errorResponse);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <LinearGradient
      colors={[colors.light.primary, colors.light.background]} // Start with your original color and end with gray
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <StyledView className="flex-1 items-center justify-center">
        <StyledView className="flex flex-col items-center justify-center space-y-10">
          <StyledImage
            className=""
            source={require("./../assets/images/logobravm.png")}
          />
          <StyledText className="text-white text-2xl font-bold">
            Sign In to continue
          </StyledText>
        </StyledView>
        <KeyboardAvoidingView
          style={{
            width: "100%",
            height: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
          behavior="position"
        >
          <StyledView className="flex flex-col items-center justify-center space-y-2 w-80 mt-14">
            <StyledTextInput
              autoCapitalize="none"
              value={username}
              onChangeText={(text) => setUsername(text)}
              placeholderTextColor="#000000"
              placeholder="Username"
              className="text-center w-[80%] h-10 bg-white rounded-2xl"
            />
            <StyledTextInput
              autoCapitalize="none"
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor="#000000"
              placeholder="Password"
              secureTextEntry
              className="text-center w-[80%] h-10 bg-white rounded-2xl"
            />
          </StyledView>
        </KeyboardAvoidingView>
        <StyledTouchableOpacity
          onPress={handleSubmit}
          className="p-5 rounded-2xl mt-5"
          style={{
            // Add additional styling here if needed
            backgroundColor: colors.light.secondary,
            width: "50%",
          }}
        >
          <StyledText
            style={{
              // Add additional styling here if needed
              color: "#FFFFFF",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Login
          </StyledText>
        </StyledTouchableOpacity>
        {error && (
          <StyledText className="text-[#FF0000] text-center mt-2">
            {error}
          </StyledText>
        )}
      </StyledView>
    </LinearGradient>
  );
};

export default withExpoSnack(Login);
