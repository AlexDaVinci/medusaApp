import axios from "axios"; // Importa axios para hacer las solicitudes HTTP
import { useFonts } from "expo-font";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import * as SplashScreen from "expo-splash-screen";
import { FormikHelpers, useFormik } from "formik";
import { Box, Text, VStack } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import ImageComponent from "../components/ImageComponent";
import InputComponent from "../components/InputComponent";
import SelectComponent from "../components/SelectComponent";
import TextAreaComponent from "../components/TextAreaComponent";
import { useAuth } from "../context/AuthContext"; // Asegúrate de importar correctamente
import { IReports } from "../interfaces";
import { reportValidationSchema } from "../utils/validations";

const initialValues: IReports = {
  incidentType: "",
  photo: "",
  photoSee: "",
  address: "",
  description: "",
  pointCoordinates: "",
};

//SplashScreen.preventAutoHideAsync();

export const HomeScreen = () => {
  const [incidentOptions, setIncidentOptions] = useState([]);
  const { authData } = useAuth();
  // const handleSubmit = async (data: IReports) => {
  //   console.log("data");
  // };

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Se requieren permisos de ubicación para enviar el informe.");
      return;
    }
  };

  useEffect(() => {
    // Solicitar permisos de ubicación al entrar en la vista
    requestLocationPermission();
  }, []);

  const [incidentTypeOptions, setIncidentTypeOptions] = useState([
    { label: "Opción 1", value: "opcion1" },
    { label: "Opción 2", value: "opcion2" },
    { label: "Opción 3", value: "opcion3" },
    // ... otras opciones estáticas
  ]);

  interface IncidentTypeOption {
    id: number;
    name: string;
    description: string;
  }

  useEffect(() => {
    // Realiza la solicitud HTTP para obtener las opciones del select
    axios
      .get("https://production.medusaapi.online/api/v1/modeloprobabilistico/Indicators", {
        headers: {
          Authorization: authData.refreshToken,
        },
      })
      .then((response) => {
        const optionsFromAPI = response.data.map(
          (option: IncidentTypeOption) => ({
            label: option.name,
            value: option.id,
          })
        );
        setIncidentTypeOptions(optionsFromAPI);
      })
      .catch((error) => {
        console.error("Error fetching incident type options:", error);
      });
  }, []);

  //Seccion de fotografia
  // const handleSelectPhoto = async () => {
  //   const permissionResult =
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();

  //   if (permissionResult.granted === false) {
  //     alert("Permiso para acceder a la galería es necesario");
  //     return;
  //   }

  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     // result.uri contiene la ruta de la imagen seleccionada
  //     formik.setFieldValue("photo", result.assets[0].uri);
  //   }
  // };

  const handleTakePhoto = async () => {
    //await requestLocationPermission();
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permiso para acceder a la cámara es necesario");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [10, 16],
      quality: 1,
    });

    if (!result.canceled) {
      const imageName = result.assets[0].uri.split("/").pop();
      if (imageName) {
        const imageType = imageName.split(".").pop();
        const imageFile = {
          uri: result.assets[0].uri,
          name: imageName,
          type: "image/" + imageType,
        };
        formik.setFieldValue("photoSee", result.assets[0].uri);
        formik.setFieldValue("photo", imageFile);

        const location = await Location.getCurrentPositionAsync({});
        if (location) {
          const { latitude, longitude } = location.coords;
          console.log("Latitude: ", latitude);
          console.log("Longitude: ", longitude);
          // Ahora puedes usar latitude y longitude en tu formulario
          formik.setFieldValue("pointCoordinates", `${latitude}, ${longitude}`);
        }
      }
    }

    // if (!result.canceled) {
    //   // result.uri contiene la ruta de la imagen capturada
    //   formik.setFieldValue("photo", result.assets[0].uri);
    // }
  };

  const handleSubmit = async (
    data: IReports,
    formikHelpers: FormikHelpers<IReports>
  ) => {
    try {
      const formData = new FormData();
      formData.append("IndicatorId", data.incidentType);
      formData.append("address", data.address);
      formData.append("description", data.description);
      formData.append("image", data.photo);
      formData.append("pointCoordinates", data.pointCoordinates);
      console.log(formData);
      const response = await axios.post(
        "https://production.medusaapi.online/api/v1/incident/store",
        formData,
        {
          headers: {
            Authorization: authData.refreshToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from server:", response.data);

      Alert.alert("Exito", "Se ha enviado el reporte", [
        {
          text: "ok",
          onPress: () => formikHelpers.resetForm(),
          style: "cancel",
        },
      ]);
      // Aquí puedes realizar cualquier acción adicional después de enviar los datos
    } catch (error) {
      Alert.alert("Error", "Muchos reportes enviados en poco tiempo", [
        {
          text: "ok",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
      console.error("Error submitting data:", error);
      // Aquí puedes manejar el error de alguna manera
    }
  };

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validationSchema: reportValidationSchema,
    onSubmit: handleSubmit,
  });

  const [fontsLoaded, fontError] = useFonts({
    "Azeret Mono": require("../assets/fonts/AzeretMono/AzeretMono-Regular.ttf"),
    "Azeret Mono Bold": require("../assets/fonts/AzeretMono/AzeretMono-Bold.ttf"),
    "Azeret Mono Extra": require("../assets/fonts/AzeretMono/AzeretMono-Black.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
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
    >
      <ScrollView style={styles.container}>
        <VStack>
          <Box>
            <Text style={styles.title}>Formulario de Reportes</Text>
            <VStack space={2} style={styles.contentForm}>
              {/* Mostrar los datos del usuario */}
              <Text style={styles.text}>
                Nombre: {authData?.name || "No disponible"}
              </Text>
              <Text style={styles.text}>
                Correo electrónico: {authData?.email || "No disponible"}
              </Text>
            </VStack>
          </Box>
        </VStack>
        <VStack>
          <Box>
            {/*se agraga un espacion entre los contenedores*/}
            <Box style={{ height: 20 }}></Box>

            <VStack space={2} style={styles.contentForm}>
              <SelectComponent
                label="Tipo de accidente*"
                options={incidentTypeOptions}
                value={formik.values.incidentType}
                messageError={formik.errors.incidentType}
                onChangeValue={(value) =>
                  formik.setFieldValue("incidentType", value)
                }
                fontFamily="Azeret Mono"
              />
              {/* 
              <InputComponent
                value={formik.values.incidentType}
                label="Tipo de accidente*"
                placeholder="Ejemplo"
                messageError={formik.errors.incidentType}
                onChangeText={formik.handleChange("incidentType")}
                fontFamily="Azeret Mono"
              /> */}
              <InputComponent
                value={formik.values.address}
                label="Direccion*"
                placeholder="Direccion del lugar de los hechos"
                messageError={formik.errors.address}
                onChangeText={formik.handleChange("address")}
                fontFamily="Azeret Mono"
              />
              <TextAreaComponent
                value={formik.values.description}
                label="Descripción del reporte*"
                placeholder="Descripcion del incidente"
                messageError={formik.errors.description}
                onChangeText={formik.handleChange("description")}
                fontFamily="Azeret Mono"
              />
            </VStack>
          </Box>
        </VStack>
        <VStack>
          <Box>
            {/*se agraga un espacion entre los contenedores*/}
            <Box style={{ height: 20 }}></Box>
            <VStack space={2} style={styles.contentForm}>
              <Box>
                {/* <Text style={styles.text}>Fotografía</Text>
                {formik.values.photo ? (
                  <Image
                    source={{ uri: formik.values.photoSee }}
                    style={styles.photoPreview}
                    alt="Foto del incidente"
                  />
                ) : (
                  <Image
                    source={require("../assets/images/notfound.png")}
                    style={styles.photoPreview}
                    alt="Imagen no encontrada"
                  />
                  // <ButtonComponent
                  //   backgroundColor="#0075ff"
                  //   style={styles.button}
                  //   title="Seleccionar Foto"
                  //   fontFamily="Azeret Mono"
                  //   onPress={handleSelectPhoto}
                  // />
                )} */}
                <ImageComponent
                  label="Fotografía*"
                  imageUrl={formik.values.photoSee} // Debes proporcionar la URL de la imagen aquí
                  messageError={formik.errors.photoSee}
                  fontFamily="Azeret Mono"
                />
                <ButtonComponent
                  backgroundColor="#0075ff"
                  style={styles.button}
                  title="Tomar Foto"
                  fontFamily="Azeret Mono"
                  onPress={handleTakePhoto}
                />
              </Box>
            </VStack>
          </Box>
        </VStack>
        <VStack>
          <Box>
            {/*se agraga un espacion entre los contenedores*/}
            <Box style={{ height: 20 }}></Box>
            <VStack space={2} style={styles.contentForm}>
              <ButtonComponent
                style={styles.button}
                title="ENVIAR"
                backgroundColor="#0075ff"
                onPress={formik.handleSubmit}
                fontFamily="Azeret Mono Bold"
              />
            </VStack>
          </Box>
        </VStack>
        {/*se agraga un espacion entre los contenedores*/}
        <Box style={{ height: 50 }}></Box>
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily: "Azeret Mono Bold",
    fontSize: 20,
    color: "white",
    marginVertical: 30,
    marginHorizontal: 50,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "100%",
    height: "100%",
  },
  contentForm: {
    padding: 15,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 5,
  },
  button: {
    marginHorizontal: 10,
    marginVertical: 10,
    fontFamily: "Azeret Mono Bold",
  },
  text: {
    color: "white",
    fontSize: 14,
    fontFamily: "Azeret Mono",
  },
  photoButton: {
    marginVertical: 10,
    fontFamily: "Azeret Mono Bold",
  },
  photoPreview: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 80,
  },
});
