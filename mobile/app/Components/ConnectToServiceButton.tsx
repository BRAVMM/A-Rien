import { styled } from "nativewind";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import LoginMicrosoft from "./LoginMicrosoft";
import LoginSpotify from "./LoginSpotify";
import LoginDiscord from "./LoginDiscord";

const StyledView = styled(View);
const StyledText = styled(Text);
styled(TouchableOpacity);

const ServiceList: { key: string; view: JSX.Element }[] = [
  {
    key: "Spotify",
    view: <LoginSpotify />,
  },
  {
    key: "Microsoft",
    view: <LoginMicrosoft />,
  },
  {
    key: "Discord",
    view: <LoginDiscord/>
  }
];

const ConnectToServiceButton = ({ serviceName }: { serviceName: string }) => {
  const service = ServiceList.find((service) => service.key === serviceName);

  if (service) {
    return service.view;
  } else {
    return (
      <StyledView>
        <StyledText>Service not found ({serviceName})</StyledText>
      </StyledView>
    );
  }
};

export default ConnectToServiceButton;
