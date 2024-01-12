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
import {ModalDataInterface} from "./Interfaces/ModalData.interface";
import actionReactionJsonDataService from "./Utils/actionReactionJsonData.serivce";
import colors from "../constants/Colors";
import AreasList from "./Components/AREAsList";
import {color} from "ansi-fragments";
import TopBar from "./Components/TopBar";

import BottomPlusButton from "./Components/BottomPlusButton";
import {SearchBar} from '@rneui/themed';
import {white} from "colorette";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
styled(SafeAreaView);

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [servicesList, setServicesList] = useState<ModalDataInterface[]>();
    const [search, setSearch] = useState<string>("");
    const router = useNavigation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const servicePicture: { [key: string]: string } = {
        Discord: require("./../assets/images/logos/Discord_logo.png"),
        // Add other service logos here
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

    const handleSearch = () => {
        console.log("Search");
    };

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

    const redirectToProfile = () => {
        router.navigate("profile" as never);
    };

    return (
        <LinearGradient
            colors={[colors.light.primary, colors.light.background]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{flex: 1}}
        >
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
                        onClear={() => {setSearch("")}}
                        placeholder="Search an area..."
                        placeholderTextColor={colors.light.fourthly}
                        showCancel
                        cancelButtonTitle="Cancel"
                        cancelButtonProps={{}}
                        onCancel={() => {setSearch("")}}
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
        </LinearGradient>
    );
};

export default withExpoSnack(Home);
