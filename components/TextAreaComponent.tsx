import { Box, FormControl, TextArea, WarningOutlineIcon } from "native-base";
import React from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputFocusEventData,
} from "react-native";

interface Props {
  label?: string;
  value?: string;
  placeholder?: string;
  messageError?: string;
  isRequired?: boolean;
  onChangeText?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  fontFamily?: string;
}

export const TextAreaComponent = ({
  label,
  value,
  placeholder,
  messageError,
  isRequired = false,
  onChangeText,
  onBlur,
  fontFamily,
}: Props) => {
  return (
    <FormControl
      isInvalid={!!messageError}
      isRequired={isRequired}
      style={styles.formControl}
    >
      {label && (
        <FormControl.Label>
          <Text style={{ fontFamily: fontFamily, ...styles.label }}>
            {label}
          </Text>
        </FormControl.Label>
      )}
      <Box alignItems="center" w="100%">
        <TextArea
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onBlur={onBlur}
          autoCompleteType={"on"}
          fontFamily={fontFamily}
          style={{ ...styles.input }}
        />
      </Box>
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        <Text style={{ fontFamily: fontFamily, ...styles.errorLabel }}>
          {messageError}
        </Text>
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default TextAreaComponent;

const styles = StyleSheet.create({
  formControl: {
    paddingHorizontal: 10,
    margin: 0,
  },
  label: {
    color: "#FFF",
  },
  errorLabel: {
    color: "#FF0000",
  },
  input: {
    flex: 1,
    width: "100%",
    color: "white",
  },
});
