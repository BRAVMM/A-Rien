/**
 * @fileoverview This file shows the list of areas
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Switch,
  Animated,
  RefreshControl
} from 'react-native';
import {useNavigation} from 'expo-router';
import {styled} from 'nativewind';
import colors from "../../constants/Colors";
import actionReactionJsonDataService from '../Utils/actionReactionJsonData.serivce';
import {AreaDetailsInterface} from "../Interfaces/areaData.interface";
import {Ionicons} from "@expo/vector-icons";
import BravmmModal from "./BravmmModal";
import {eraseArea, toggleArea} from "../Utils/callApi";
import {FadeLoading} from 'react-native-fade-loading';
import {ImageSourcePropType} from "react-native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);

const servicePicture: { [key: string]: ImageSourcePropType } = {
  Discord: require("./../../assets/images/logos/Discord_logo.png"),
  Twitch: require("./../../assets/images/logos/Twitch_logo.png"),
  Spotify: require("./../../assets/images/logos/Spotify_logo.png"),
  Teams: require("./../../assets/images/logos/Teams_logo.png"),
  Gmail: require("./../../assets/images/logos/Gmail_logo.png"),
  Outlook: require("./../../assets/images/logos/Outlook_logo.png"),
  TrackerGG: require("./../../assets/images/logos/TrackerGG_logo.png"),
  Onedrive: require("./../../assets/images/logos/Onedrive_logo.png"),
  Weather: require("./../../assets/images/logos/Weather_logo.png"),
  Timer: require("./../../assets/images/logos/Timer_logo.png"),
};

const getServicePicture = (serviceName: string): ImageSourcePropType => {
  const picture = servicePicture[serviceName];
  if (picture) {
    return picture;
  } else {
    return require("./../../assets/images/logobravm.png");
  }
}

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
            if (await toggleArea(area.id)) {
              setIsActivated(!isActivated);
              setNeedRefresh(true)
            } else {
              console.error("toggleArea failed")
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
  const [areasToDisplay, setAreasToDisplay] = useState<AreaDetailsInterface[]>([]);
  const router = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [areaToEdit, setAreaToEdit] = useState<AreaDetailsInterface>();
  const [needRefresh, setNeedRefresh] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  async function fetchAreas() {
    const areaData = await actionReactionJsonDataService.getAreas(router);
    setAreas(areaData);
    setAreasToDisplay(areaData);
  }

  useEffect(() => {
    fetchAreas();
  }, []);

  useEffect(() => {
    if (needRefresh) {
      fetchAreas().then(r => {
        setNeedRefresh(false);
      });
    }
  }, [needRefresh]);

  useEffect(() => {
    if (search !== "") {
      const filteredAreas = areas.filter((area) => {
        return area.title.toLowerCase().includes(search.toLowerCase());
      });
      setAreasToDisplay(filteredAreas);
    } else {
      fetchAreas();
    }
  }, [search]);

  const onRefresh = () => {
    setNeedRefresh(true);
    setRefreshing(true);
    setTimeout(() => {
      if (!needRefresh) {
        setRefreshing(false);
      }
    }, 500);
  }

  return (
    <StyledView className="flex-1">
      <StyledScrollView className="flex-1"
                        showsHorizontalScrollIndicator={true}
                        refreshControl={
                          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                                          tintColor={colors.light.superlight}/>
                        }
                        endFillColor={colors.light.background}
      >
        {areasToDisplay.map((area: any) => (
          <StyledTouchableOpacity
            key={area.id}
            className="flex-row items-center justify-between px-4 py-4"
            onPress={() => {
              setAreaToEdit(area);
              setIsModalOpen(true)
            }}
          >
            {area && area.serviceName && area.title ?
              <StyledView className="flex-row items-center justify-between px-8 py-4 w-full">
                <StyledImage
                  style={{width: 80, height: 80, marginRight: 20}}
                  source={getServicePicture(area.serviceName)}
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
                <StyledView
                  className={`w-4 h-4 rounded-full ${area.isActivated ? "bg-green-500" : "bg-red-500"} relative top-[-10%] left-[10%] z-10`}/>
              </StyledView>
              :
              <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: 80
              }}>
                <FadeLoading primaryColor={colors.light.secondary} secondaryColor={colors.light.thirdly}
                             duration={5000}
                             style={{width: "100%", height: "100%"}} animated={true} visible={true}
                             children={<></>}/>
              </View>
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
