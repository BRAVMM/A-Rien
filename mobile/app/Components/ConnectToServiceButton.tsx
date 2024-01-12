import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {styled, withExpoSnack} from "nativewind"
import colors from "../../constants/Colors";
import BravvmButton from "./BravvmButton";
import LoginSpotify from "./LoginSpotify";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

// const ServiceList = an array that have a string in key and that return a view with a text
const ServiceList: { key: string, view: JSX.Element }[] = [
    {
        key: "Spotify",
        view:
            <LoginSpotify/>
    },
    {
        key: "Microsoft",
        view:
            <StyledTouchableOpacity>
                <StyledText>Microsoft</StyledText>
            </StyledTouchableOpacity>
    }
]

const ConnectToServiceButton = ({serviceName}: { serviceName: string }) => {
    const service = ServiceList.find((service) => service.key === serviceName);

    if (service) {
        return (
            service.view
        )
    } else {
        return (
            <StyledView>
                <StyledText>Service not found ({serviceName})</StyledText>
            </StyledView>
        )
    }
}

export default ConnectToServiceButton;
