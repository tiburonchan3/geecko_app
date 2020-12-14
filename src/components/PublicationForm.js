import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Text,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { COLORS } from "../colors/colors";
import { Formik } from "formik";
import { AddPublicationApi } from "../api/publication";

export default function PublicationForm(props) {
  const { setRefreshPublications, setShowModalP } = props;
  const [image, setImage] = useState(null);
  const handleSubmit = async (values) => {
    await AddPublicationApi(values, image)
      .then(() => {
        setShowModalP(false);
        Alert.alert("Exito", "Se guardo la publicacion!!");
        setRefreshPublications(true);
      })
      .catch(() => {
        console.log("No sirvio");
      });
  };
  const pickDocument = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    let filename = result.uri.substr(result.uri.lastIndexOf("/") + 1);
    let ext = "image/" + filename.substr(filename.lastIndexOf(".") + 1);
    result.type = ext;
    const more = { path: filename, name: filename };
    result = { ...result, ...more };
    setImage(result);
  };
  return (
    <View style={styles.body}>
      <Formik
        initialValues={{ publicacion: "", tecnologias: "" }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formContent}>
            <TextInput
              onChangeText={handleChange("publicacion")}
              onBlur={handleBlur("publicacion")}
              value={values.publicacion}
              style={[styles.inputs, styles.textArea]}
              placeholder="Escribe lo que quieres publicar"
              placeholderTextColor={COLORS.white}
              multiline={true}
              numberOfLines={8}
            />
            <TextInput
              onChangeText={handleChange("tecnologias")}
              onBlur={handleBlur("tecnologias")}
              value={values.tecnologias}
              style={[styles.inputs, styles.textInput]}
              placeholder="Escribe la tcnologia que usas"
              placeholderTextColor={COLORS.white}
            />
            <TouchableHighlight
              onPress={handleSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableHighlight>
          </View>
        )}
      </Formik>
      <View style={styles.hr} />
      <View style={styles.area}>
        <TouchableHighlight style={styles.fileButton} onPress={pickDocument}>
          <Text style={styles.textFile}>
            Buscar{" "}
            <FontAwesome5Icon size={25} name="image" style={styles.icon} />
          </Text>
        </TouchableHighlight>
        {image && <Image style={styles.image} source={{ uri: image.uri }} />}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  area: {
    marginTop: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: 100,
    height: 90,
    marginLeft: 30,
  },
  hr: {
    width: "100%",
    height: 0.5,
    backgroundColor: COLORS.medium_grey,
  },
  inputs: {
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
    color: COLORS.medium_grey,
    padding: 5,
    marginTop: 20,
    width: 300,
  },
  submitButton: {
    position: "absolute",
    bottom: -50,
    right: 10,
    backgroundColor: COLORS.primary,
    width: 100,
    borderRadius: 15,
    padding: 5,
    textAlign: "center",
  },
  buttonText: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 15,
  },
  icon: {
    color: COLORS.white,
  },
  textArea: {
    marginTop: -50,
  },
  textInput: {
    marginBottom: 40,
  },
  fileButton: {
    marginLeft: -130,
  },
  textFile: {
    color: COLORS.white,
    marginRight: 5,
    padding: 5,
  },
});
