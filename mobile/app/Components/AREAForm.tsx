/**
 * @client
 */
import {styled} from "nativewind";
import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";

/* Interfaces */
import {ActionJsonArray} from "../Interfaces/ActionJson.interface";
import colors from "../../constants/Colors";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

/**
 * @component AREAForm component
 * @param {ActionJsonArray} fields - Fields to display
 * @param setDatas
 * @return {JSX.Element} AREAForm component with fields to display
 * @note This component is used to display a form with fields and submit button that will return the data in JSON format
 */
const AREAForm: React.FC<{
  fields: ActionJsonArray;
  setDatas: (data: string) => void;
}> = ({ fields, setDatas }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);

  const handleChange = (title: string, value: string) => {
    setFormData({ ...formData, [title]: value });
  };

  const handleSubmit = () => {
    const outputData = fields.map((field) => ({
      [field.title]: formData[field.title] || "",
    }));
    setDatas(JSON.stringify(outputData));
  };

  return (
    <StyledView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {fields.map((field) => (
        <StyledView
          key={field.title}
          style={{ marginBottom: 10, width: "80%" }}
        >
          <StyledTextInput
            value={formData[field.title] || ""}
            onChangeText={(text) => {
              if (field.range) {
                const value = parseInt(text, 10);
                if (
                  !isNaN(value) &&
                  value >= field.range[0] &&
                  value <= field.range[1]
                ) {
                  setError(null);
                  handleChange(field.title, text);
                } else {
                  setError(
                    `The value must be between ${field.range[0]} and ${field.range[1]}`,
                  );
                }
              } else {
                handleChange(field.title, text);
              }
            }}
            placeholder={field.description}
            placeholderTextColor={colors.light.background}
            className="text-center w-[100%] h-10 bg-white rounded-2xl"
          />
        </StyledView>
      ))}
      <StyledTouchableOpacity
        onPress={() => handleSubmit()}
        className="p-3 rounded-2xl mt-5"
        style={{
          // Add additional styling here if needed
          backgroundColor: colors.light.fourthly,
          width: "50%",
        }}
      >
        <StyledText
          style={{
            // Add additional styling here if needed
            color: "#FFFFFF",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Submit
        </StyledText>
      </StyledTouchableOpacity>
      {error && (
        <StyledText className="text-[#FF0000] text-center mt-2">
          {error}
        </StyledText>
      )}
    </StyledView>
  );
};

export default AREAForm;
