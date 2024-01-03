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
    console.error("Error:", error);
    setError("An error occurred, please try again");
  };
  const handleSubmit = async () => {
    if (password === undefined || password === "") {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Clear any existing errors

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
        }
      );
      console.log("response", response);
      if (response.ok) {
        // Redirect to home page
        setLoginSuccess(true);
        // save token
        const token = await response.json();
        console.log("token", token);
        await AsyncStorage.setItem("token", token);
      } else {
        // Handle non-ok response
        const errorResponse = await response.json(); // You may need to parse the response body
        handleError(errorResponse);
      }
    } catch (error) {
      // Handle error
      handleError(error);
    }
  };

  return (
    <StyledView className="flex-1 items-center justify-center bg-[#24204A]">
      <StyledView className="flex flex-col items-center justify-center space-y-10">
        <StyledImage
          className=""
          source={require("./../assets/images/logobravm.png")}
        />
        <StyledText className="text-white text-2xl font-bold">
          Sign In to continue
        </StyledText>
      </StyledView>
      <StyledView className="flex flex-col items-center justify-center space-y-2 w-[80%] mt-14">
      <StyledTextInput
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholderTextColor={"#000000"}
        placeholder="Username"
        style={{
          textAlign: "center",
          width: "80%",
          height: 40,
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
        }}
      />
      <StyledTextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor={"#000000"}
        placeholder="Password"
        secureTextEntry
        style={{
          textAlign: "center",
          width: "80%",
          height: 40,
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
        }}
      />
      </StyledView>
      <StyledTouchableOpacity
        onPress={handleSubmit}
        style={{
          // Add additional styling here if needed
          backgroundColor: "#4285F4",
          padding: 10,
          borderRadius: 10,
          marginTop: 20,
          
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
        <StyledText className="text-red text-center mt-2">{error}</StyledText>
      )}
    </StyledView>
  );
};

export default withExpoSnack(Login);
