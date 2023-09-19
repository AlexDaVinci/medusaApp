import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Formik, FormikValues } from "formik";
import { Box, VStack } from "native-base";
import React, { useCallback } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import { useAuth } from "../context/AuthContext";
import { ILogin } from "../interfaces";
import { loginValidationSchema } from "../utils/validations";

const initialValues: ILogin = {
  email: "",
  password: "",
};

//SplashScreen.preventAutoHideAsync();

export const LoginScreen = () => {
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const navigation = useNavigation<any>();
  const { login } = useAuth();

  const [fontsLoaded, fontError] = useFonts({
    "Azeret Mono": require("../assets/fonts/AzeretMono/AzeretMono-Regular.ttf"),
    "Azeret Mono Bold": require("../assets/fonts/AzeretMono/AzeretMono-Bold.ttf"),
    "Azeret Mono Extra": require("../assets/fonts/AzeretMono/AzeretMono-Black.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleLogin = async (values: FormikValues) => {
    console.log("Iniciado");
    console.log(values);
    try {
      // Aquí realizamos la solicitud de inicio de sesión utilizando Axios
      const response = await axios.post(
        "https://production.medusaapi.online/api/v1/auth/login",
        {
          email: values.email,
          password: values.password,
        }
      );

      // Almacenamos los datos en el contexto de autenticación
      login(response.data.data);

      // Navegamos a la pantalla de dashboard
      navigation.navigate("dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ExpoStatusBar style="dark" animated={true} />
      <LinearGradient
        colors={[
          "#020515",
          "#06091b",
          "#090c21",
          "#0c0f27",
          "#0d122d",
          "#10183c",
          "#161c4b",
          "#1d215b",
          "#2e2978",
          "#442e94",
          "#5f32b0",
          "#7d32ca",
        ]}
        style={styles.container}
      >
        <SafeAreaView>
          <VStack space={2} style={styles.containerBorder}>
            <Box alignItems={"center"}>
              <Image
                source={require("../assets/images/medusa_logoResp.png")}
                style={styles.logo}
              />
            </Box>

            <Box>
              <Text style={styles.title}>Inicio de sesión</Text>
              {/* <Box>
								<ButtonComponent title="Button Gmail" style={styles.button} />
							</Box>
							<Text style={styles.separator}>Or</Text> */}
              <Formik
                initialValues={initialValues}
                validationSchema={loginValidationSchema}
                validateOnChange={true}
                onSubmit={handleLogin}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  errors,
                  touched,
                }) => (
                  <VStack space={2} style={styles.containerForm}>
                    <InputComponent
                      label="Email*"
                      placeholder="ejemplo@email.com"
                      style={styles.inputs}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      messageError={touched.email && errors.email}
                      fontFamily="Azeret Mono"
                    />

                    <InputComponent
                      label="Contraseña*"
                      placeholder="Escribe tu contraseña"
                      type="password"
                      style={styles.inputs}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      messageError={touched.password && errors.password}
                      fontFamily="Azeret Mono"
                    />

                    <ButtonComponent
                      style={styles.button}
                      title="INICIAR"
                      backgroundColor="#0075ff"
                      onPress={handleSubmit}
                      fontFamily="Azeret Mono Bold"
                    />
                  </VStack>
                )}
              </Formik>
            </Box>
          </VStack>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 120,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginLeft: 10,
    fontFamily: "Azeret Mono Bold",
    textAlign: "center",
  },
  containerForm: {
    marginTop: 10,
    padding: 0,
  },
  inputs: {
    color: "white",
    fontSize: 14,
    backgroundColor: "#0f1535",
  },
  containerBorder: {
    width: 300,
  },
  button: {
    marginHorizontal: 10,
    marginVertical: 10,
    fontFamily: "Azeret Mono Bold",
  },
  separator: {
    fontFamily: "Azeret Mono",
    color: "#FFF",
    textAlign: "center",
  },
});
