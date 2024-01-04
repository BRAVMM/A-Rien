import { styled, withExpoSnack } from "nativewind";
import React from "react";
import { Text, View } from "react-native";

const StyledView = styled(View);
const StyledText = styled(Text);

const Home = () => {
  return (
    <StyledView className="flex-1 items-center justify-center">
      <StyledText>Home Screen</StyledText>
    </StyledView>
  );
};

export default withExpoSnack(Home);
