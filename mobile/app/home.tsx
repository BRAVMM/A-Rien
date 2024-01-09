import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "expo-router";
import {styled, withExpoSnack} from "nativewind";
import React, {useEffect, useState} from "react";
import {Image, SafeAreaView, Text, TextInput, TouchableOpacity, View,} from "react-native";

import BravmmModal from "./Components/BravmmModal";
import SelectServices from "./Components/SelectServices";
import {ModalDataInterface} from "./Interfaces/ModalData.interface";
import actionReactionJsonDataService from "./Utils/actionReactionJsonData.serivce";
import colors from "../constants/Colors";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
styled(SafeAreaView);
const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [servicesList, setServicesList] = useState<ModalDataInterface[]>();
  const [service, setService] = useState<ModalDataInterface>();
  const [search, setSearch] = useState<string>("");
  const router = useNavigation();

  const servicePicture: { [key: string]: string } = {
    Discord: require("./../assets/images/logos/Discord_logo.png"),
    Twitch: require("./../assets/images/logos/Twitch_logo.png"),
    Spotify: require("./../assets/images/logos/Spotify_logo.png"),
    Teams: require("./../assets/images/logos/Teams_logo.png"),
    Gmail: require("./../assets/images/logos/Gmail_logo.png"),
    Outlook: require("./../assets/images/logos/Outlook_logo.png"),
    TrackerGG: require("./../assets/images/logos/TrackerGG_logo.png"),
    Onedrive: require("./../assets/images/logos/Onedrive_logo.png"),
    Weather: require("./../assets/images/logos/Weather_logo.png"),
    Timer: require("./../assets/images/logos/Timer_logo.png"),
  };

  /**
   * @function useEffect
   * @description useEffect to fetch actionJsonData when ModalData is defined
   */
  useEffect(() => {
  }, [isModalOpen]);

  /**
   * @function useEffect
   * @description useEffect to fetch actionJsonData when ModalData is defined
   */
  useEffect(() => {
    const services = actionReactionJsonDataService.getServices();

    services.then((services) => {
      setServicesList(services);
    });
  }, []);

  // TODO: Implement search functionality
  const handleSearch = () => {
    console.log("Search");
  };

  /**
   * @function useEffect
   * @description useEffect to fetch actionJsonData when ModalData is defined
   */
  useEffect(() => {
    const services = actionReactionJsonDataService.getServices();

    services.then((services) => {
      setServicesList(services);
    });
  }, []);

  const redirectToProfile = () => {
    router.navigate("profile" as never);
  };

  return (
    <LinearGradient
      colors={[colors.light.primary, colors.light.background]} // Start with your original color and end with gray
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <StyledText className="text-white text-2xl font-bold top-[10%] left-[10%]">
        Your AREAs
      </StyledText>

      <TouchableOpacity
        onPress={() => redirectToProfile()}
        className="w-1/6 h-1/6 flex items-center justify-center"
      >
        <Image
          source={require("./../assets/images/logobravm.png")}
          style={{ width: 45, height: 55, top: "70%", left: "80%" }}
        />
      </TouchableOpacity>
      <SafeAreaView style={{ flex: 1 }}>
        <StyledView className="top-[10%] items-center z-10">
          <StyledTextInput
            autoCapitalize="none"
            value={search}
            onChangeText={(text) => setSearch(text)}
            className="p-4 text-sm rounded-lg w-[90%]"
            style={{ backgroundColor: colors.light.background }}
            placeholder="Search services"
          />
          <StyledTouchableOpacity
            onPress={handleSearch}
            className="absolute end-2.5 bottom-2.5 rounded-lg h-8 w-20 flex items-center justify-center"
            style={{ left: "70%", backgroundColor: colors.light.secondary }}
          >
            <StyledText className="text-white text-sm">Search</StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        <BravmmModal
          animationType="slide"
          transparent={true}
          visible={isModalOpen}
          style={{flex: 1, position: "absolute", top: 0, left: 0}}
          onRequestClose={() => {
            setIsModalOpen(false);
          }}
        >
          <SelectServices />
        </BravmmModal>
        <StyledView
          className="absolute top-[90%] left-[75%]"
          style={{ width: 60, height: 60 }}
        >
          <StyledTouchableOpacity
            onPress={() => setIsModalOpen(true)}
            className="flex-1 justify-center items-center"
          >
            <Image
              source={require("./../assets/images/plus.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </StyledTouchableOpacity>
        </StyledView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default withExpoSnack(Home);
