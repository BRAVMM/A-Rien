import { Stack, useNavigation } from "expo-router";
import { withExpoSnack, styled } from "nativewind";
import React, { useState } from "react";
import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const App = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const router = useNavigation();

  const handleError = (error: any) => {
    console.error("Error:", error);
    setError("An error occurred, please try again");
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
        }
      );
      if (response.ok) {
        // Redirect to home page
        setRegisterSuccess(true);
        router.navigate("login" as never);
      } else {
        // Handle non-ok response
        const errorResponse = await response.json(); // You may need to parse the response body
        handleError(errorResponse);
      }
    } catch (error) {
      // Handle fetch error
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
          Sign up to get started
        </StyledText>
      </StyledView>
      <StyledView className="flex flex-col items-center justify-center space-y-2 w-[80%] mt-14">
        <StyledTextInput
          value={email}
          placeholderTextColor={"#000000"}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          style={{
            textAlign: "center",
            width: "80%",
            height: 40,
            backgroundColor: "#FFFFFF",
            borderRadius: 10,
          }}
        />
        <StyledTextInput
          value={username}
          placeholderTextColor={"#000000"}
          onChangeText={(text) => setUsername(text)}
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
          placeholderTextColor={"#000000"}
          onChangeText={(text) => setPassword(text)}
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
        <StyledTextInput
          value={rePassword}
          placeholderTextColor={"#000000"}
          onChangeText={(text) => setRePassword(text)}
          placeholder="Repeat Password"
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
          backgroundColor: "#4285F4",
          padding: 10,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <StyledText
          style={{
            color: "#FFFFFF",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Register
        </StyledText>
      </StyledTouchableOpacity>
      <StyledTouchableOpacity
        onPress={() => router.navigate("login" as never)}
        style={{
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <StyledText
          style={{
            color: "#FFFFFF",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Already have an account? Go to login
        </StyledText>
      </StyledTouchableOpacity>
      {error && (
        <StyledText className="text-red text-center mt-2">{error}</StyledText>
      )}
    </StyledView>
  );
};

export default withExpoSnack(App);
