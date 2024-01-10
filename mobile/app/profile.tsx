import {styled, withExpoSnack} from "nativewind";
import React, {useEffect, useState} from "react";
import {Image, SafeAreaView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {ActionJsonArray} from "./Interfaces/ActionJson.interface";
import {ModalDataInterface} from "./Interfaces/ModalData.interface";
import actionReactionJsonDataService from "./Utils/actionReactionJsonData.serivce";
import AREACreationModal from "./Components/AREACreation";
import {LinearGradient} from "expo-linear-gradient";
import colors from "../constants/Colors";
import {useNavigation} from "expo-router";
import LoginMicrosoft from "./Components/LoginMicrosoft";


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);

const Profile = () => {

    useEffect(() => {
        console.log("Hello world!")
    }, []);


    return (
        <StyledSafeAreaView className="flex-1">
            <StyledView className="justify-center items-center">
                <LoginMicrosoft />
            </StyledView>
        </StyledSafeAreaView>
    );
};

export default withExpoSnack(Profile);
