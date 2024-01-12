import React, {useEffect, useState} from "react";
import {useNavigation} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {styled, withExpoSnack} from "nativewind";
import {
    ActivityIndicator,
    Image,
    Modal,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {BlurView} from 'expo-blur';


import colors from "../constants/Colors";
import AnimatedBackground from "./Components/AnimatedBackground";
import TopBar from "./Components/TopBar";
import ConnectToServiceButton from "./Components/ConnectToServiceButton";

import {UserDataInterface} from "./Interfaces/UserData.interface";
import BravvmButton from "./Components/BravvmButton";

import {getUserInfo, updateUserEmail, updateUserPassword, updateUserUsername} from "./Utils/callApi";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const ModalEditProfileAttribute = ({
                                       isActivated,
                                       attributes,
                                       placeholders,
                                       applyModification,
                                       setIsModalActivated,
                                       setNeedRefresh
                                   }: {
    isActivated: boolean,
    attributes: string[],
    placeholders: string[],
    applyModification: any,
    setIsModalActivated:  React.Dispatch<React.SetStateAction<boolean>>,
    setNeedRefresh:  React.Dispatch<React.SetStateAction<boolean>>,
}) => {
    const [entryList, setEntryList] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (attributes !== undefined && placeholders !== undefined) {
            if (attributes.length !== placeholders.length) {
                console.error("attributes and placeholders must have the same length");
                return;
            }
            setEntryList(attributes);
        }
    }, [attributes, placeholders]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isActivated}
            onRequestClose={() => {
                setIsModalActivated(false)
            }}
        >
            <TouchableWithoutFeedback onPress={() => setIsModalActivated(false)}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{
                        width: "90%",
                        height: "30%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        overflow: 'hidden',
                        borderColor: colors.light.secondary,
                        borderWidth: 2,
                    }}>
                        <BlurView intensity={10} style={{
                            flex: 1,
                            width: "100%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            {entryList !== undefined && (entryList?.map((entry: string, index: number) => (
                                <StyledTextInput
                                    key={index}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={entry}
                                    onChangeText={(text) => {
                                        let _entryList = [...entryList];
                                        _entryList[index] = text;
                                        setEntryList(_entryList);
                                    }}
                                    placeholderTextColor="#000000"
                                    placeholder={placeholders[index]}
                                    className="text-center w-[80%] h-10 bg-white rounded-2xl"
                                />
                            )))}
                            {
                                error && <StyledText className="text-red-500">{error}</StyledText>
                            }
                            <StyledView
                                className="flex flex-row justify-between items-center w-[50%] h-[20%] mt-[10%]">
                                <BravvmButton
                                    title="Confirm" fontSize={20}
                                    color={colors.light.fifthly}
                                    icon={"checkmark-done-outline"}
                                    iconColor={colors.light.superlight}
                                    onPress={async () => {
                                        if (entryList.includes("")) {
                                            setError("Entry cannot be empty");
                                        } else {
                                            let result = await applyModification(entryList);
                                            if (result === null) {
                                                setError("Error");
                                                return;
                                            }
                                            if (result.status === 200) {
                                                setError(null);
                                                setNeedRefresh(true);
                                                setIsModalActivated(false);
                                            } else {
                                                setError(result.error);
                                            }
                                        }
                                    }}
                                />
                            </StyledView>
                        </BlurView>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const Profile = () => {
    const router = useNavigation();
    const [user, setUser] = useState<UserDataInterface | null>(null);
    const [needRefresh, setNeedRefresh] = useState<boolean>(true);
    const [isModalActivated, setIsModalActivated] = useState<boolean>(false);
    const [attributes, setAttributes] = useState<string[]>([]);
    const [placeholders, setPlaceholders] = useState<string[]>([]);
    const [funcName, setFuncName] = useState<string>("");

    useEffect(() => {
        if (!needRefresh) {
            return;
        }
        setUser(null);
        const fetchData = async () => {
            const user: UserDataInterface | null = await getUserInfo();
            setUser(user);
            setNeedRefresh(false);
        };
        fetchData();
    }, [needRefresh]);

    const updateUsername = (datas: string[]) => async () => {
        if (datas.length !== 1) {
            console.error("updateUsername, datas must have a length of 1");
            return;
        }
        const newUsername: string = datas[0];
        if (newUsername) {
            return await updateUserUsername(newUsername);
        } else {
            console.error("newUsername is null or undefined");
        }
    }

    const updateEmail = (datas: string[]) => async () => {
        if (datas.length !== 1) {
            console.error("updateEmail, datas must have a length of 1");
            return;
        }
        const newEmail: string = datas[0];
        return await updateUserEmail(newEmail);
    }

    const updatePassword = (datas: string[]) => async () => {
        if (datas.length !== 2) {
            console.error("updatePassword, datas must have a length of 2");
            return;
        }
        const oldPassword: string = datas[0];
        const newPassword: string = datas[1];
        return await updateUserPassword(oldPassword, newPassword);
    }

    const handlePress = async (data: string[]) => {
        if (funcName === "updateUsername") {
            return await updateUsername(data)();
        }
        if (funcName === "updateEmail") {
            return await updateEmail(data)();
        }
        if (funcName === "updatePassword") {
            return await updatePassword(data)();
        }
    }

    return (
        <AnimatedBackground>
            <SafeAreaView style={{flex: 1}}>
                <TopBar title="Profile" router={router}/>
                {user ? (
                    <StyledView className="flex-1 text-center items-center mt-[2%]">
                        <StyledImage
                            source={require("./../assets/images/favicon.png")}
                            style={{width: 100, height: 100}}
                            className="rounded-full bg-white"
                        />
                        <StyledView className="flex flex-col justify-center items-center w-[65%] mt-[5%]">
                            <StyledTouchableOpacity
                                className="flex flex-row justify-between items-center w-full mt-[7%]"
                                onPress={() => {
                                    if (user) {
                                        setAttributes([user.username]);
                                        setPlaceholders(["New username"]);
                                        setFuncName("updateUsername")
                                        setIsModalActivated(true);
                                    }
                                }}
                            >
                                <StyledText className="text-white text-2xl font-bold">
                                    Username:
                                </StyledText>
                                <StyledText className="text-white text-2xl font-bold">
                                    {user?.username as string}
                                </StyledText>
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity
                                className="flex flex-row justify-between items-center w-full mt-[7%]"
                                onPress={() => {
                                    if (user) {
                                        setAttributes([user.email]);
                                        setPlaceholders(["New email"]);
                                        setFuncName("updateEmail")
                                        setIsModalActivated(true);
                                    }
                                }}
                            >
                                <StyledText className="text-white text-2xl font-bold">
                                    Email:
                                </StyledText>
                                <StyledText className="text-white text-2xl font-bold">
                                    {user?.email as string}
                                </StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                        <StyledView className="flex flex-col justify-center items-center mt-[5%] h-[49%]">
                            <StyledView className="flex justify-center items-center w-[65%] h-[18%]">
                                <ConnectToServiceButton serviceName="Spotify"/>
                            </StyledView>
                            <ConnectToServiceButton serviceName="Microsoft"/>
                        </StyledView>
                        <StyledView className="flex-grow flex flex-col justify-end items-center mt-[5%] mb-[5%]">
                            <StyledView className="flex justify-center items-center w-[60%] h-10">
                                <BravvmButton
                                    title="Change Password" fontSize={20}
                                    color={colors.light.fifthly}
                                    icon={"finger-print-outline"}
                                    iconColor={colors.light.superlight}
                                    onPress={async () => {
                                        setAttributes(["", ""]);
                                        setPlaceholders(["Old password", "New password"]);
                                        setFuncName("updatePassword")
                                        setIsModalActivated(true);
                                    }}/>
                            </StyledView>
                            <StyledView className="flex justify-center items-center mt-4 w-[40%] h-10">
                                <BravvmButton
                                    title="Logout" fontSize={20}
                                    color={colors.light.softRed}
                                    icon={"log-out-outline"}
                                    onPress={async () => {
                                        await AsyncStorage.removeItem("token");
                                        router.navigate("login" as never);
                                    }}/>
                            </StyledView>
                        </StyledView>
                    </StyledView>
                ) : (
                    <StyledView className="flex-1 justify-center items-center mt-[2%]">
                        <ActivityIndicator size="large" color={colors.light.superlight}/>
                    </StyledView>
                )}
                <ModalEditProfileAttribute isActivated={isModalActivated} attributes={attributes}
                                           placeholders={placeholders}
                                           applyModification={handlePress}
                                           setIsModalActivated={setIsModalActivated}
                                           setNeedRefresh={setNeedRefresh}/>
            </SafeAreaView>
        </AnimatedBackground>
    );
};

export default withExpoSnack(Profile);
