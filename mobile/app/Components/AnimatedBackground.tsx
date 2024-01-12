import colors from "../../constants/Colors";
import React from "react";
import {LinearGradient} from "expo-linear-gradient";
import {styled} from "nativewind";
import {View} from "react-native";
import {FadeLoading} from "react-native-fade-loading";

const StyledView = styled(View);

const AnimatedBackground = ({children}: { children: React.ReactNode }) => {
    return (
        <StyledView style={{flex: 1}}>
            <LinearGradient
                colors={[colors.light.primary, colors.light.background]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{flex: 1}}
            >
                <FadeLoading primaryColor={colors.light.primary} secondaryColor={colors.light.fifthly}
                             animated={true}
                             duration={20000}
                             style={{flex: 1, width: "100%", height: "100%", position: "absolute", top: 0, left: 0, opacity: 0.3}}
                             visible={true}
                             children={<></>}
                />
                {children}
            </LinearGradient>
        </StyledView>
    );
}

export default AnimatedBackground;
