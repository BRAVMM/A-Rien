import React from "react";
import {Text, TouchableOpacity, View, Image} from "react-native";
import {styled, withExpoSnack} from "nativewind";
import colors from "../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const BravvmButton = ({title, onPress, fontSize, textColor, color, icon, iconColor, iconOrImgSize, img}: {
    title: string,
    onPress: any,
    fontSize?: number,
    textColor?: string,
    color?: string,
    icon?: string,
    iconColor?: string,
    iconOrImgSize?: number,
    img?: any,
}) => {
    const buttonFontSize = fontSize ? fontSize : 20;
    const buttonColor = color ? color : colors.light.secondary;
    const buttonIconColor = iconColor ? iconColor : "white";
    const buttonIconOrImgSize = iconOrImgSize ? iconOrImgSize : 24;
    const buttonTextColor = textColor ? textColor : "white";

    return (
        <StyledTouchableOpacity
            onPress={onPress}
            className="rounded-2xl"
            style={{
                backgroundColor: buttonColor,
                width: "100%",
                height: "100%",
                flex: 1,
                flexDirection: "row",
                justifyContent: icon || img ? "space-around" : "center",
                alignItems: "center",
                paddingLeft: icon || img ? 10 : 0,
                paddingRight: icon || img ? 10 : 0,
            }}
        >
            <StyledText
                className="text-center font-bold"
                style={{
                    fontSize: buttonFontSize,
                    color: buttonTextColor,
                }}
            >
                {title}
            </StyledText>
            {icon && <Ionicons name={icon as any} size={buttonIconOrImgSize} color={buttonIconColor}/>}
            {img && <Image source={img} style={{width: buttonIconOrImgSize, height: buttonIconOrImgSize}}/>}
        </StyledTouchableOpacity>
    )
}

export default BravvmButton;
