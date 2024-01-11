import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { styled, withExpoSnack } from "nativewind";
import BravmmModal from "./Components/BravmmModal";
import SelectServices from "./Components/SelectServices";
import { ModalDataInterface } from "./Interfaces/ModalData.interface";
import actionReactionJsonDataService from "./Utils/actionReactionJsonData.serivce";
import colors from "../constants/Colors";
import {color} from "ansi-fragments";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
styled(SafeAreaView);

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [servicesList, setServicesList] = useState<ModalDataInterface[]>();
  const [search, setSearch] = useState<string>("");
  const router = useNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const servicePicture: { [key: string]: string } = {
    Discord: require("./../assets/images/logos/Discord_logo.png"),
    // Add other service logos here
  };

  useEffect(() => {
    const services = actionReactionJsonDataService.getServices();

    services.then((services) => {
      setServicesList(services);
    });
  }, []);

  const handleSearch = () => {
    console.log("Search");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <LinearGradient
      colors={[colors.light.primary, colors.light.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <StyledText className="text-white text-2xl font-bold top-[8%] left-[10%]">
        Your AREAs
      </StyledText>

      <StyledTouchableOpacity
        onPress={toggleDropdown}
        className="flex-1 top-[7%] w-[12%] left-[80%] absolute z-30"
      >
        <Image
          source={require("./../assets/images/logobravm.png")}
          style={{ width: 45, height: 55 }}
        />
      </StyledTouchableOpacity>

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

        {isDropdownOpen && (
          <View
            style={{
              top: "3%",
              left: "56%",
              backgroundColor: colors.light.primary,
              borderRadius: 10,
              zIndex: 10,
              height: "10%",
              width: "40%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setIsDropdownOpen(false);
                router.navigate("profile" as never); // Navigate to the profile screen
              }}
              style={{ padding: 10 }}
            >
              <StyledText className="text-white">Profile</StyledText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsDropdownOpen(false);
                router.navigate("home" as never); // Navigate to the home screen
              }}
              style={{ padding: 10 }}
            >
              <StyledText className="text-white">Home</StyledText>
            </TouchableOpacity>
          </View>
        )}

        <BravmmModal
          animationType="slide"
          transparent={true}
          visible={isModalOpen}
          style={{ flex: 1, position: "absolute", top: 0, left: 0 }}
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
