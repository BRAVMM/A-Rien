/**
 * @fileoverview This file shows the list of areas
 */

import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Switch} from 'react-native';
import {useNavigation} from 'expo-router';
import {styled} from 'nativewind';
import colors from "../../constants/Colors";
import actionReactionJsonDataService from '../Utils/actionReactionJsonData.serivce';
import {AreaDetailsInterface} from "../Interfaces/areaData.interface";
import {Ionicons} from "@expo/vector-icons";
import BravmmModal from "./BravmmModal";
import {eraseArea, toggleArea} from "../Utils/callApi";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);

const IMAGE_PATH: string = "./../../assets/images";

const servicePicture: { [key: string]: string } = {
    Discord: require(IMAGE_PATH + "/logos/Discord_logo.png"),
    Twitch: require(IMAGE_PATH + "/logos/Twitch_logo.png"),
    Spotify: require(IMAGE_PATH + "/logos/Spotify_logo.png"),
    Teams: require(IMAGE_PATH + "/logos/Teams_logo.png"),
    Gmail: require(IMAGE_PATH + "/logos/Gmail_logo.png"),
    Outlook: require(IMAGE_PATH + "/logos/Outlook_logo.png"),
    TrackerGG: require(IMAGE_PATH + "/logos/TrackerGG_logo.png"),
    Onedrive: require(IMAGE_PATH + "/logos/Onedrive_logo.png"),
    Weather: require(IMAGE_PATH + "/logos/Weather_logo.png"),
    Timer: require(IMAGE_PATH + "/logos/Timer_logo.png"),
};

const EditArea = ({area, setNeedRefresh, setIsModalOpen}: {
    area: AreaDetailsInterface | undefined,
    setNeedRefresh: React.Dispatch<React.SetStateAction<boolean>>
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    if (!area) {
        return (
            <ActivityIndicator size="large" color={colors.light.fourthly}/>
        )
    }
    const [isActivated, setIsActivated] = useState<boolean>(area.isActivated);

    return (
        <StyledView className="flex-col items-center justify-between px-8 py-10 w-full">
            <StyledImage
                style={{width: 150, height: 150}}
                // @ts-ignore
                source={servicePicture[area.serviceName]}
            ></StyledImage>
            <StyledText
                numberOfLines={1}
                style={{
                    color: "white",
                    fontSize: 30,
                    fontWeight: "bold",
                    maxWidth: '80%',
                    textAlign: "center",
                    marginTop: "5%"
                }}>
                {area.title}
            </StyledText>
            <StyledView
                className="flex-row items-center justify-between w-full mt-10">
                <StyledText
                    numberOfLines={1}
                    style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold",
                        maxWidth: '80%',
                        textAlign: "center",
                    }}>
                    Activate or deactivate
                </StyledText>
                <Switch
                    trackColor={{false: '#767577', true: colors.light.thirdly}}
                    thumbColor={isActivated ? colors.light.superlight : colors.light.sixthly}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={async () => {
                        console.log("toggleArea")
                        if (await toggleArea(area.id)) {
                            console.log("toggleArea success")
                            setIsActivated(!isActivated);
                            setNeedRefresh(true)
                        } else {
                            console.log("toggleArea failed")
                        }
                    }}
                    value={isActivated}
                />
            </StyledView>
            <StyledView className="flex-row items-center justify-between w-full mt-10">
                <StyledText
                    numberOfLines={1}
                    style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold",
                        maxWidth: '80%',
                        textAlign: "center",
                        marginTop: "5%"
                    }}>
                    Delete
                </StyledText>
                <StyledTouchableOpacity
                    onPress={async () => {
                        if (await eraseArea(area.id)) {
                            setNeedRefresh(true)
                            setIsModalOpen(false)
                        }
                    }}
                    className="flex items-center">
                    <Ionicons name={"trash-outline"} size={40} color="red"/>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>
    );
}

const AreasList = ({search}: { search: string }) => {
    const [areas, setAreas] = useState<AreaDetailsInterface[]>([]);
    const router = useNavigation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [areaToEdit, setAreaToEdit] = useState<AreaDetailsInterface>();
    const [needRefresh, setNeedRefresh] = useState(false);

    async function fetchAreas() {
        const areaData = await actionReactionJsonDataService.getAreas(router);
        setAreas(areaData);
    }

    useEffect(() => {
        fetchAreas();
    }, []);

    useEffect(() => {
        if (needRefresh) {
            fetchAreas();
            setNeedRefresh(false);
        }
    }, [needRefresh]);

    useEffect(() => {
        if (search !== "") {
            const filteredAreas = areas.filter((area) => {
                return area.title.toLowerCase().includes(search.toLowerCase());
            });
            setAreas(filteredAreas);
        } else {
            fetchAreas();
        }
    }, [search]);


    return (
        <StyledView className="flex-1">
            <StyledScrollView className="flex-1" showsHorizontalScrollIndicator={true}>
                {areas.map((area: any) => (
                    <StyledTouchableOpacity
                        key={area.id}
                        className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200"
                        onPress={() => {
                            setAreaToEdit(area);
                            setIsModalOpen(true)
                        }}
                    >
                        {area && area.length !== 0 ?
                            <StyledView className="flex-row items-center justify-between px-8 py-4 w-full">
                                <StyledImage
                                    style={{width: 80, height: 80, marginRight: 20}}
                                    // @ts-ignore
                                    source={servicePicture[area.serviceName]}
                                ></StyledImage>
                                <StyledText
                                    numberOfLines={1}
                                    style={{
                                        color: "white",
                                        fontSize: 30,
                                        fontWeight: "bold",
                                        maxWidth: '80%'
                                    }}>
                                    {area.title}
                                </StyledText>
                                <StyledView className={`w-4 h-4 rounded-full ${area.isActivated ? "bg-green-500" : "bg-red-500"} relative top-[-10%] left-[10%] z-10`}/>
                            </StyledView>
                            :
                            <ActivityIndicator size="large" color={colors.light.fourthly}/>
                        }
                    </StyledTouchableOpacity>
                ))}
                <BravmmModal
                    animationType="slide"
                    transparent={true}
                    visible={isModalOpen}
                    style={{flex: 1, position: "absolute", top: 0, left: 0}}
                    onRequestClose={() => {
                        setIsModalOpen(false);
                    }}
                >
                    <EditArea area={areaToEdit} setNeedRefresh={setNeedRefresh} setIsModalOpen={setIsModalOpen}/>
                </BravmmModal>
            </StyledScrollView>
        </StyledView>
    );
}

export default AreasList;
