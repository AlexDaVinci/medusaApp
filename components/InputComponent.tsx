import { FormControl, Input, WarningOutlineIcon } from "native-base";
import { memo } from "react";
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
  messageError?: string | undefined | false;
  isRequired?: boolean;
  type?: "text" | "password";
  onChangeText?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  style?: {};
  fontFamily?: string;
}

export const InputComponent = memo(
  ({
    label,
    value,
    placeholder,
    messageError,
    isRequired = false,
    type,
    onChangeText,
    onBlur,
    style,
    fontFamily,
  }: Props) => {
    const renderInput = () => {
      return (
        <Input
          value={value}
          mx="3"
          placeholder={placeholder ? placeholder : value}
          onChangeText={onChangeText}
          onBlur={(e) => onBlur}
          type={type}
          color={"white"}
          style={{ ...style }}
          fontFamily={fontFamily}
        />
      );
    };

    return (
      <FormControl
        isInvalid={!!messageError}
        isRequired={isRequired}
        style={styles.formControl}
      >
        {label && (
          <FormControl.Label ml={3} _text={{ color: "white" }}>
            <Text style={{ fontFamily: fontFamily, ...styles.label }}>
              {label}
            </Text>
          </FormControl.Label>
        )}
        {renderInput()}
        <FormControl.ErrorMessage
          style={{ marginLeft: 12 }}
          leftIcon={<WarningOutlineIcon size="xs" />}
        >
          <Text style={{ fontFamily: fontFamily, ...styles.errorLabel }}>
            {messageError}
          </Text>
        </FormControl.ErrorMessage>
      </FormControl>
    );
  }
);

export default InputComponent;

const styles = StyleSheet.create({
  formControl: {
    padding: 0,
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
  },
});
