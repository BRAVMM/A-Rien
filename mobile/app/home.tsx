import { styled, withExpoSnack } from "nativewind";
import React from "react";
import { Text, View } from "react-native";
import LoginSpotify from "./Components/LoginSpotify";

const StyledView = styled(View);
const StyledText = styled(Text);

const Home = () => {
  return (
    <StyledView className="flex-1 items-center justify-center">
      <LoginSpotify/>
    </StyledView>
  );
}; 

export default withExpoSnack(Home);
