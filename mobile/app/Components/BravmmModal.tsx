import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { styled } from "nativewind";
import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";

import colors from "../../constants/Colors";

styled(View);
const BravmmModal: React.FC<{
  visible: boolean;
  animationType?: "slide" | "fade" | "none";
  onRequestClose?: () => void;
  children?: React.ReactNode;
  style?: any;
  transparent?: boolean;
}> = ({
  visible,
  animationType = "slide",
  onRequestClose,
  children,
  style,
  transparent,
}) => {
  return (
    <Modal
      animationType={animationType}
      visible={visible}
      onRequestClose={onRequestClose}
      style={style}
      transparent={transparent}
    >
      <TouchableOpacity onPress={onRequestClose} style={{ height: "10%" }} />
      <TouchableOpacity
        onPress={onRequestClose}
        style={{
          position: "absolute",
          top: "11%",
          left: "90%",
          zIndex: 20,
          width: "5%",
          height: "5%",
        }}
      >
        <Image
          source={require("./../../assets/images/close.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableOpacity>
      <LinearGradient
        colors={[colors.light.secondary, colors.light.background]} // Start with your original color and end with gray
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, borderRadius: 25, backgroundColor: "black" }}
      >
        {children}
      </LinearGradient>
    </Modal>
  );
};

export default BravmmModal;
