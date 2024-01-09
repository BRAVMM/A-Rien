import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

import GradientBar from "./GradiantBar";

interface IconServiceProps {
  path: string;
  width: number;
  height: number;
  name: string;
}

function IconService({ path, width, height, name }: IconServiceProps) {
  return (
    <View className="flex flex-col w-full items-center justify-center h-1/6 text-white text-3xl truncate space-y-5">
      <Image source={path} style={{ width, height }} />
      <Text>{name}</Text>
      <GradientBar />
    </View>
  );
}

export default IconService;
