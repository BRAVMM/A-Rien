import {styled, withExpoSnack} from "nativewind";
import {Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";

import colors from "../constants/Colors";
import {LinearGradient} from "expo-linear-gradient";
import React, {useEffect, useState} from "react";
import {useNavigation} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const StyledView = styled(View);
  const StyledText = styled(Text);
  const StyledTextInput = styled(Text);
  const StyledTouchableOpacity = styled(TouchableOpacity);
  const StyledImage = styled(Image);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useNavigation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      let response: Response;

      if (!token) {
        router.navigate("login" as never);
        return;
      }

      try {
        response = await fetch(
          process.env.EXPO_PUBLIC_API_URL + "/users/me",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          },
        );
      } catch (e) {
        router.navigate("login" as never);
        return;
      }
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        // Rediriger vers la page de connexion en cas d'échec de la requête
        router.navigate("login" as never);
      }
    };

    checkToken();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      let response: Response;

      try {
        response = await fetch(
          process.env.EXPO_PUBLIC_API_URL + "/users/me",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + (await AsyncStorage.getItem("token")),
            },
          },
        );
      } catch (e) {
        return;
      }
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <LinearGradient
      colors={[colors.light.primary, colors.light.background]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}
    >
      <SafeAreaView style={{flex: 1}}>
        <StyledText className="text-white text-2xl font-bold top-[1%] left-[10%]">
          Your Profile
        </StyledText>

        <StyledTouchableOpacity
          onPress={toggleDropdown}
          className="flex-1 top-[7%] w-[12%] left-[80%] absolute z-30"
        >
          <Image
            source={require("./../assets/images/logobravm.png")}
            style={{width: 45, height: 55}}
          />
        </StyledTouchableOpacity>
        <StyledView className="justify-center text-center items-center top-[10%]">
          <StyledImage
            source={require("./../assets/images/favicon.png")}
            style={{ width: 100, height: 100 }}
            className="rounded-full bg-white"
          />
          <StyledText className="text-white text-2xl font-bold">
            Username: {user?.username as string}
          </StyledText>
          <StyledText className="text-white text-2xl font-bold">
            Email: {user?.email as string}
          </StyledText>
          <StyledTouchableOpacity>
            <StyledText className="text-white text-2xl font-bold">
              Change Password
            </StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity>
            <StyledText className="text-white text-2xl font-bold">
              Connect to Spotify
            </StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity>
            <StyledText className="text-white text-2xl font-bold">
              Connect to Microsoft
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
        {isDropdownOpen && (
          <View
            style={{
              top: "17%",
              left: "56%",
              backgroundColor: colors.light.primary,
              borderRadius: 10,
              zIndex: 10,
              height: "10%",
              width: "40%",
              position: "absolute",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setIsDropdownOpen(false);
                router.navigate("profile" as never); // Navigate to the profile screen
              }}
              style={{padding: 10}}
            >
              <StyledText className="text-white">Profile</StyledText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsDropdownOpen(false);
                router.navigate("home" as never); // Navigate to the home screen
              }}
              style={{padding: 10}}
            >
              <StyledText className="text-white">Home</StyledText>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default withExpoSnack(Profile);
