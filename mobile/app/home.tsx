import React, {useEffect, useState} from "react";
import {
    Image,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "expo-router";
import {styled, withExpoSnack} from "nativewind";
import BravmmModal from "./Components/BravmmModal";
import SelectServices from "./Components/SelectServices";
import colors from "../constants/Colors";
import AreasList from "./Components/AREAsList";
import TopBar from "./Components/TopBar";
import BottomPlusButton from "./Components/BottomPlusButton";
import {SearchBar} from '@rneui/themed';
import AnimatedBackground from "./Components/AnimatedBackground";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
styled(SafeAreaView);

const Children = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const router = useNavigation();

    return (
        <SafeAreaView style={{flex: 1}}>
            <TopBar title="Home" router={router}/>
            <SearchBar
                platform="ios"
                searchIcon={{size: 24}}
                containerStyle={{backgroundColor: "transparent", top: "0%", marginBottom: "-3%"}}
                inputContainerStyle={{backgroundColor: colors.light.secondary, borderRadius: 50}}
                inputStyle={{color: "white", fontSize: 20}}
                leftIconContainerStyle={{}}
                rightIconContainerStyle={{}}
                loadingProps={{animating: true}}
                onChangeText={newVal => {
                    setSearch(newVal);
                }}
                onClear={() => {
                    setSearch("")
                }}
                placeholder="Search an area..."
                placeholderTextColor={colors.light.fourthly}
                showCancel
                cancelButtonTitle="Cancel"
                cancelButtonProps={{}}
                onCancel={() => {
                    setSearch("")
                }}
                value={search}
            />

            <AreasList search={search}/>

            <BravmmModal
                animationType="slide"
                transparent={true}
                visible={isModalOpen}
                style={{flex: 1, position: "absolute", top: 0, left: 0}}
                onRequestClose={() => {
                    setIsModalOpen(false);
                }}
            >
                <SelectServices/>
            </BravmmModal>
            <BottomPlusButton setIsButtonTouched={setIsModalOpen}/>
        </SafeAreaView>
    );
}

const Home = () => {
    return (
        <AnimatedBackground>
            <Children/>
        </AnimatedBackground>
    );
};

export default withExpoSnack(Home);
