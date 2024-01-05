import { Image } from 'expo-image';
import React from 'react';
import GradientBar from './GradiantBar';
import {View, Text} from "react-native";

interface IconServiceProps {
    path: string;
    witdh: number;
    height: number;
    name: string;
}

function IconService({ path, witdh, height, name }: IconServiceProps) {
    return (
        <View className="flex flex-col w-full items-center justify-center h-1/6 text-white text-3xl truncate space-y-5">
            <Image source={path} style={{ width: witdh, height: height }} />
            <Text>{name}</Text>
            <GradientBar />
        </View>
    );
}

export default IconService;
