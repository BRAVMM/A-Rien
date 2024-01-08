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


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);

const Home = () => {
    const fields: ActionJsonArray = [
        {
            title: "name",
            type: "string",
            description: "Name of the user",
        },
        {
            title: "age",
            type: "number",
            description: "Age of the user",
            range: [18, 99],
        }
    ];
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [servicesList, setServicesList] = useState<ModalDataInterface[]>();
    const [service, setService] = useState<ModalDataInterface>();
    const [search, setSearch] = useState<string>("");
    const router = useNavigation();

    const servicePicture: { [key: string]: string } = {
        "Discord": require("./../assets/images/logos/Discord_logo.png"),
        "Twitch": require("./../assets/images/logos/Twitch_logo.png"),
        "Spotify": require("./../assets/images/logos/Spotify_logo.png"),
        "Teams": require("./../assets/images/logos/Teams_logo.png"),
        "Gmail": require("./../assets/images/logos/Gmail_logo.png"),
        "Outlook": require("./../assets/images/logos/Outlook_logo.png"),
        "TrackerGG": require("./../assets/images/logos/TrackerGG_logo.png"),
        "Onedrive": require("./../assets/images/logos/Onedrive_logo.png"),
        "Weather": require("./../assets/images/logos/Weather_logo.png"),
        "Timer": require("./../assets/images/logos/Timer_logo.png"),
    }

    /**
     * @function useEffect
     * @description useEffect to fetch actionJsonData when ModalData is defined
     */
    useEffect(() => {
        if (isModalOpen) {
            console.log("Modal is open");
        }
    }, [isModalOpen]);

    /**
     * @function useEffect
     * @description useEffect to fetch actionJsonData when ModalData is defined
     */
    useEffect(() => {
        const services = actionReactionJsonDataService.getServices();

        services.then((services) => {
            setServicesList(services);
        });
    }, []);

    const handleSearch = () => {
        console.log("Search");
    }

    /**
     * @function handleModal
     * @description handleModal to open the modal
     * @param {ModalDataInterface} service - service to display in the modal
     */
    const handleModal = (service: ModalDataInterface) => {
        setService(service);
        setIsModalOpen(true);
    };

    const redirectToProfile = () => {
        router.navigate("profile" as never);
    }

    return (
        <LinearGradient
            colors={[colors.light.primary, colors.light.background]} // Start with your original color and end with gray
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{flex: 1}}
        >
            <StyledText className="text-white text-2xl font-bold top-[10%] left-[10%]">
                Your AREAs
            </StyledText>

            <TouchableOpacity
                onPress={() => redirectToProfile()}
                className="w-1/6 h-1/6 flex items-center justify-center"
            >
                <Image
                    source={require("./../assets/images/logobravm.png")}
                    style={{width: 45, height: 55, top: "70%", left: "80%"}}
                />
            </TouchableOpacity>

            <StyledView className="top-[10%] items-center z-10">
                <StyledTextInput
                    autoCapitalize={"none"}
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    className="p-4 text-sm rounded-lg w-[90%]"
                    style={{backgroundColor: colors.light.background}}
                    placeholder="Search services"
                />
                <StyledTouchableOpacity onPress={handleSearch}
                                        className="absolute end-2.5 bottom-2.5 rounded-lg h-8 w-20 flex items-center justify-center"
                                        style={{left: "70%", backgroundColor: colors.light.secondary}}
                >
                    <StyledText className="text-white text-sm">Search</StyledText>
                </StyledTouchableOpacity>
            </StyledView>

            <StyledSafeAreaView className="flex-1 justify-center">
                {service ? <AREACreationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    ModalData={service}
                /> : null}
                <StyledView>
                    {servicesList !== undefined && (servicesList?.map((service) => (
                        <StyledTouchableOpacity
                            key={service.id}
                            className="flex items-center justify-center w-[30%] h-[30%] m-5"
                            onPress={() => handleModal(service)}>
                            <Image
                                source={servicePicture[service.name]}
                                style={{width: 100, height: 100}}
                            />
                            <StyledText className="text-white text-2xl font-bold absolute left-[150%]">
                                {service.name}
                            </StyledText>
                        </StyledTouchableOpacity>
                    )))}
                </StyledView>
            </StyledSafeAreaView>
        </LinearGradient>
    );
};

export default withExpoSnack(Home);
