import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Alert,
  Keyboard,
} from "react-native";
import { COLORS } from "../colors/colors";
import { Formik } from "formik";
import * as Auth from "../api/auth";
import { isEmailValid } from "../utils/validation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ setRefreshLogin, setShow }) {
  const handleSubmit = (values) => {
    Keyboard.dismiss();
    if (values.email !== "" && values.password !== "") {
      values.email = values.email.replace(/ /g, "");
      if (isEmailValid(values.email)) {
        Auth.loginApi(values).then(async (r) => {
          try {
            await AsyncStorage.setItem("@token", r.token);
            await setRefreshLogin(true);
            setShow(true);
            setTimeout(function() {
              setShow(false);
            }, 4000);
          } catch (error) {
            setShow(false);
            setRefreshLogin(false);
            Alert.alert("Error", "Los datos son incorrectos");
          }
        });
      } else {
        Alert.alert("Advertencia", "El email es invalido");
      }
    } else {
      Alert.alert("Advertencia", "No puedes dejar campos vacios");
    }
  };

  return (
    <View style={styles.body}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formContent}>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              style={styles.inputs}
              placeholder="Escribe tu email"
              placeholderTextColor={COLORS.white}
              textContentType="emailAddress"
            />
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              style={styles.inputs}
              placeholder="Escribe tu password"
              placeholderTextColor={COLORS.white}
              textContentType="password"
              secureTextEntry={true}
            />
            <TouchableHighlight
              onPress={handleSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.buttonText}>Iniciar Sesion</Text>
            </TouchableHighlight>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.blue_dark_two,
    width: "100%",
    padding: 50,
    height: "60%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: "absolute",
    bottom: 0,
  },
  inputs: {
    borderBottomColor: COLORS.white,
    borderBottomWidth: 2,
    width: "100%",
    height: 40,
    marginBottom: 70,
    padding: 10,
    fontSize: 15,
    color: COLORS.white,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    width: "90%",
    borderRadius: 50,
    height: 50,
    textAlign: "center",
  },
  formContent: {
    marginTop: 30,
  },
  buttonText: {
    marginTop: 10,
    textAlign: "center",
    color: COLORS.white,
    fontSize: 20,
  },
});
