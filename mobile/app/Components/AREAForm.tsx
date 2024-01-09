/**
 * @client
 */
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

/* Interfaces */
import { ActionJsonArray } from "../Interfaces/ActionJson.interface";

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {fields.map((field) => (
        <View key={field.title} style={{ marginBottom: 10 }}>
          <TextInput
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
            style={{ borderWidth: 1, padding: 10, width: 200 }}
          />
        </View>
      ))}
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={{
          backgroundColor: error ? "red" : "#382B59",
          padding: 10,
          borderRadius: 5,
        }}
      />
      {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
    </View>
  );
};

export default AREAForm;
