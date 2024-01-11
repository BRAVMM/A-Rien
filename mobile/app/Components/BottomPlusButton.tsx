import {Image, TouchableOpacity, View} from "react-native";
import React from "react";
import {styled} from "nativewind";

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);

const BottomPlusButton = ({setIsButtonTouched}: { setIsButtonTouched:  React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <StyledView
            className="absolute top-[96%] left-[75%]"
            style={{width: 60, height: 60}}
        >
            <StyledTouchableOpacity
                onPress={() => setIsButtonTouched(true)}
                className="flex-1 justify-center items-center"
            >
                <Image
                    source={require("./../../assets/images/plus.png")}
                    style={{width: "100%", height: "100%"}}
                />
            </StyledTouchableOpacity>
        </StyledView>
    );
}

export default BottomPlusButton;
