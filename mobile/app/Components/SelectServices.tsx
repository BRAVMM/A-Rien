import { styled, withExpoSnack } from "nativewind";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView, ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {useNavigation} from "expo-router";

import AREACreationModal from "./AREACreation";
import { ModalDataInterface } from "../Interfaces/ModalData.interface";
import actionReactionJsonDataService from "../Utils/actionReactionJsonData.serivce";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);

const SelectServices = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [servicesList, setServicesList] = useState<ModalDataInterface[]>();
  const [service, setService] = useState<ModalDataInterface>();
  const router = useNavigation();

  const servicePicture: { [key: string]: string } = {
    Discord: require("./../../assets/images/logos/Discord_logo.png"),
    Twitch: require("./../../assets/images/logos/Twitch_logo.png"),
    Spotify: require("./../../assets/images/logos/Spotify_logo.png"),
    Teams: require("./../../assets/images/logos/Teams_logo.png"),
    Gmail: require("./../../assets/images/logos/Gmail_logo.png"),
    Outlook: require("./../../assets/images/logos/Outlook_logo.png"),
    TrackerGG: require("./../../assets/images/logos/TrackerGG_logo.png"),
    Onedrive: require("./../../assets/images/logos/Onedrive_logo.png"),
    Weather: require("./../../assets/images/logos/Weather_logo.png"),
    Timer: require("./../../assets/images/logos/Timer_logo.png"),
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
    const services = actionReactionJsonDataService.getServices(router);

    services.then((services) => {
      setServicesList(services);
    });
  }, []);

  /**
   * @function handleModal
   * @description handleModal to open the modal
   * @param {ModalDataInterface} service - service to display in the modal
   */
  const handleModal = (service: ModalDataInterface) => {
    setService(service);
    setIsModalOpen(true);
  };

  return (
    // eslint-disable-next-line react/jsx-no-undef
    <StyledSafeAreaView className="flex-1 justify-center">
      {service ? (
        <AREACreationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          ModalData={service}
        />
      ) : null}
      <StyledView className="flex flex-row items-center justify-center mt-[15%]">
        <StyledText className="text-white text-4xl font-bold">
          Select a service
        </StyledText>
      </StyledView>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <StyledView className="mb-[70%]">
          {servicesList !== undefined &&
            servicesList?.map((service, index) => (
              <StyledTouchableOpacity
                key={index}
                className="flex items-center justify-center w-[30%] h-[30%] m-5"
                onPress={() => handleModal(service)}
              >
                <Image
                  // @ts-ignore
                  source={servicePicture[service.name]}
                  style={{ width: 100, height: 100 }}
                />
                <StyledText className="text-white text-2xl font-bold absolute left-[150%]">
                  {service.name}
                </StyledText>
              </StyledTouchableOpacity>
            ))}
        </StyledView>
      </ScrollView>
    </StyledSafeAreaView>
  );
};

export default withExpoSnack(SelectServices);
