import {styled, withExpoSnack} from "nativewind";
import React, {useEffect, useState} from "react";
import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {ActionJsonArray} from "./Interfaces/ActionJson.interface";
import {ModalDataInterface} from "./Interfaces/ModalData.interface";
import actionReactionJsonDataService from "./Utils/actionReactionJsonData.serivce";
import IconService from "./Components/IconService";
import AREACreationModal from "./Components/AREACreation";
import LoginSpotify from "./Components/LoginSpotify";

const StyledView = styled(View);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledText = styled(Text);

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

    const servicePicture: { [key: string]: string } = {
        "Discord": "./../assets/images/logos/Discord_logo.svg",
        "Twitch": "./../assets/images/logos/Twitch_logo.svg",
        "Spotify": "./../assets/images/logos/Spotify_logo.svg",
        "Teams": "./../assets/images/logos/Teams_logo.svg",
        "Gmail": "./../assets/images/logos/Gmail_logo.svg",
        "Outlook": "./../assets/images/logos/Outlook_logo.svg",
        "TrackerGG": "./../assets/images/logos/TrackerGG_logo.svg",
        "Onedrive": "./../assets/images/logos/OneDrive_logo.svg",
        "Weather": "./../assets/images/logos/Weather_logo.svg",
        "Timer": "./../assets/images/logos/Timer_logo.svg",
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

    /**
     * @function handleModal
     * @description handleModal to open the modal
     * @param {ModalDataInterface} service - service to display in the modal
     */
    const handleModal = (service: ModalDataInterface) => {
        setService(service);
        setIsModalOpen(true);
    };

    return (
        <StyledSafeAreaView className="flex-1 items-center justify-center">
            <LoginSpotify/>
            {service ? <AREACreationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                ModalData={service}
            /> : null}
            <StyledText>Home Screen</StyledText>
            <TouchableOpacity onPress={() => setIsModalOpen(true)}>
                <StyledText>Open Modal</StyledText>
            </TouchableOpacity>
            {servicesList !== undefined && (servicesList?.map((service) => (
                <TouchableOpacity
                    key={service.id}
                    className="w-full h-1/2 flex items-center justify-center"
                    onPress={() => handleModal(service)}>
                    <IconService
                        path={servicePicture[service.name]}
                        witdh={100}
                        height={100}
                        name={service.name}
                    />
                </TouchableOpacity>
            )))}
        </StyledSafeAreaView>
    );
};

export default withExpoSnack(Home);