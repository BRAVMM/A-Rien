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

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const router = useNavigation();

  useEffect(() => {
    if (registerSuccess) {
      // Redirect to the home page
      router.navigate("home" as never);
    }

    // Clean-up function
    return () => {
      // Reset login state
      setRegisterSuccess(false);
      // Any other clean-up actions can be placed here
    };
  }, [registerSuccess, router]);

  const handleError = (error: any) => {
    setError(error.error);
  };

  const handleSubmit = async () => {
    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Clear any existing errors

    const data = {
      email,
      username,
      password,
    };

    try {
      const response = await fetch(
        process.env.EXPO_PUBLIC_API_URL + "/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      if (response.ok) {
        const token = await response.json();
        await AsyncStorage.setItem("token", token.token);
        setRegisterSuccess(true);
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
            Sign up to get started
          </StyledText>
        </StyledView>
        <KeyboardAvoidingView
          style={{
            width: "100%",
            height: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
          behavior="position"
        >
          <StyledView className="flex flex-col items-center justify-center space-y-2 w-80 mt-14">
            <StyledTextInput
              autoCapitalize="none"
              value={email}
              placeholderTextColor="#000000"
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              className="text-center w-[80%] h-10 bg-white rounded-2xl"
            />
            <StyledTextInput
              autoCapitalize="none"
              value={username}
              placeholderTextColor="#000000"
              onChangeText={(text) => setUsername(text)}
              placeholder="Username"
              className="text-center w-[80%] h-10 bg-white rounded-2xl"
            />
            <StyledTextInput
              autoCapitalize="none"
              value={password}
              placeholderTextColor="#000000"
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              secureTextEntry
              className="text-center w-[80%] h-10 bg-white rounded-2xl"
            />
            <StyledTextInput
              autoCapitalize="none"
              value={rePassword}
              placeholderTextColor="#000000"
              onChangeText={(text) => setRePassword(text)}
              placeholder="Repeat Password"
              secureTextEntry
              className="text-center w-[80%] h-10 bg-white rounded-2xl"
            />
          </StyledView>
        </KeyboardAvoidingView>
        <StyledTouchableOpacity
          onPress={handleSubmit}
          className="bg-cyan p-2 rounded-2xl mt-5 w-[40%]"
          style={{ backgroundColor: colors.light.secondary }}
        >
          <StyledText style={{ color: "white", fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
            Register
          </StyledText>
        </StyledTouchableOpacity>
        {error && (
          <StyledText className="text-[#FF0000] text-center top-2">
            {error}
          </StyledText>
        )}
        <StyledView className="flex flex-row, justify-center top-[4%]">
          <StyledText className="text-white text-xl font-bold">
            Already have an account?
          </StyledText>
          <TouchableOpacity onPress={() => router.navigate("login" as never)}>
            <StyledText
              className="text-center text-2xl font-bold"
              style={{ color: colors.light.fourthly }}
            >
              Go to login
            </StyledText>
          </TouchableOpacity>
        </StyledView>
      </StyledView>
    </LinearGradient>
  );
};

export default withExpoSnack(Register);
