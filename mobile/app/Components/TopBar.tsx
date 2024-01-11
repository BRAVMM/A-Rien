import {Image, TouchableOpacity, View, Text, Modal, FlatList, SafeAreaView} from "react-native";
import React, {ReactElement, useEffect, useState} from "react";
import {styled} from "nativewind";
import colors from "../../constants/Colors";
import {NavigationProp} from "@react-navigation/native";

const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledFlatList = styled(FlatList);
const StyledSafeAreaView = styled(SafeAreaView);

const Logo = () => {
    return (
        <StyledImage
            source={require("./../../assets/images/logobravm.png")}
            style={{width: 45, height: 55}}
        />
    );
}

const RenderDropdown = ({data, setVisible, visible, elementAction}: {
    data: any,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    visible: boolean,
    elementAction: any
}) => {
    return (
        <Modal visible={visible} transparent animationType="none">
            <StyledTouchableOpacity
                onPress={() => setVisible(false)}
                className="flex-1"
            >
                {/*<View style={[styles.dropdown, { top: dropdownTop }]}>*/}
                <StyledView
                    className="absolute z-30 rounded-lg shadow-lg"
                    style={{
                        width: 150, // Set the width of the dropdown
                        height: 100, // Set the height of the dropdown
                        top: "15%", // Adjust the top position
                        right: "5%", // Adjust the right position
                        backgroundColor: colors.light.secondary
                    }}
                >
                    <FlatList
                        data={data}
                        renderItem={({item}) => (
                            <StyledTouchableOpacity
                                onPress={() => elementAction(item)}
                                className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200"
                            >
                                <StyledText className="text-white">{item.name}</StyledText>
                            </StyledTouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </StyledView>
            </StyledTouchableOpacity>
        </Modal>
    );
};


const TopBar = ({title, router}: { title: string, router: NavigationProp<any> }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <StyledView
            style={{
                top: 0,
                left: 0,
                width: "100%",
                height: "10%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                paddingVertical: 10,
            }}
        >
            <StyledText style={{color: "white", fontSize: 20, fontWeight: "bold"}}>
                {title}
            </StyledText>

            <StyledTouchableOpacity
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <Logo/>
            </StyledTouchableOpacity>
            <RenderDropdown
                data={[{name: "Home", path: "home"}, {name: "Profile", path: "profile"}]}
                setVisible={setIsDropdownOpen}
                visible={isDropdownOpen}
                elementAction={(item: any) => {
                    setIsDropdownOpen(false);
                    router.navigate(item.path as never);
                }}/>
        </StyledView>
    );
}

export default TopBar;
