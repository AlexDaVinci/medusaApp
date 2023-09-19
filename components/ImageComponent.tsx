import { Box, FormControl, Image, WarningOutlineIcon } from "native-base";
import { memo } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputFocusEventData,
} from "react-native";

interface Props {
  label?: string;
  imageUrl?: string;
  placeholder?: string;
  messageError?: string | undefined | false;
  isRequired?: boolean;
  onChangeText?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  style?: {};
  fontFamily?: string;
}

export const ImageComponent = memo(
  ({
    label,
    imageUrl,
    placeholder,
    messageError,
    isRequired = false,
    onChangeText,
    onBlur,
    style,
    fontFamily,
  }: Props) => {
    const renderImage = () => {
      if (!imageUrl) {
        // Si no hay imageUrl, muestra la imagen de reemplazo
        return (
          <Box
            mx="3"
            display="flex"
            alignItems="center" // Centra verticalmente
            justifyContent="center" // Centra horizontalmente
          >
            <Image
              source={require("../assets/images/notfound.png")}
              alt={placeholder || label}
              style={{ ...style, width: 150, height: 150 }}
            />
          </Box>
        );
      }

      return (
        <Box
          mx="3"
          display="flex"
          alignItems="center" // Centra verticalmente
          justifyContent="center" // Centra horizontalmente
        >
          <Image
            source={{ uri: imageUrl }}
            alt={placeholder || label}
            style={{ ...style, width: 150, height: 150 }}
          />
        </Box>
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
        {renderImage()}
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

export default ImageComponent;

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
