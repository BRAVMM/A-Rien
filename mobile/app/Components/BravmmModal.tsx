import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Modal, TouchableOpacity } from "react-native";

import colors from "../../constants/Colors";

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
    <LinearGradient
      colors={[colors.light.primary, colors.light.background]} // Start with your original color and end with gray
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <Modal
        animationType={animationType}
        visible={visible}
        onRequestClose={onRequestClose}
        style={style}
        transparent={transparent}
      >
        <TouchableOpacity onPress={onRequestClose}>
          <Image
            source={require("./../../assets/images/close.png")}
            style={{ width: 75, height: 75, top: "30%", left: "80%" }}
          />
        </TouchableOpacity>
        {children}
      </Modal>
    </LinearGradient>
  );
};

export default BravmmModal;
