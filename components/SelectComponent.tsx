import { FormControl, Select, WarningOutlineIcon } from "native-base";
import React, { memo } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputFocusEventData,
} from "react-native";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  value?: string;
  placeholder?: string;
  messageError?: string | undefined | false;
  isRequired?: boolean;
  options: Option[];
  onChangeValue?: (value: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  style?: {};
  fontFamily?: string;
}

export const SelectComponent = memo(
  ({
    label,
    value,
    placeholder,
    messageError,
    isRequired = false,
    options,
    onChangeValue,
    onBlur,
    style,
    fontFamily,
  }: Props) => {
    const renderSelect = () => {
      return (
        <Select
          selectedValue={value}
          // @ts-ignore-next-line
          optimized={false}
          mx="3"
          color={"white"}
          placeholder={placeholder || label}
          onValueChange={(itemValue) =>
            onChangeValue && onChangeValue(itemValue)
          }
          _selectedItem={{
            bg: "teal.600",
            endIcon: <WarningOutlineIcon size="xs" />,
          }}
          fontFamily={fontFamily}
        >
          {options.map((option) => (
            <Select.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Select>
      );
    };

    return (
      <FormControl
        isInvalid={!!messageError}
        isRequired={isRequired}
        style={styles.formControl}
      >
        {label && (
          <FormControl.Label ml={1} _text={{ color: "white" }}>
            <Text style={{ fontFamily, ...styles.label }}>{label}</Text>
          </FormControl.Label>
        )}
        {renderSelect()}
        <FormControl.ErrorMessage
          style={{ marginLeft: 12 }}
          leftIcon={<WarningOutlineIcon size="xs" />}
        >
          <Text style={{ fontFamily, ...styles.errorLabel }}>
            {messageError}
          </Text>
        </FormControl.ErrorMessage>
      </FormControl>
    );
  }
);

export default SelectComponent;

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
});
