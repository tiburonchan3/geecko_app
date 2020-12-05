import { Formik } from "formik";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../colors/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import { isEmailValid } from "../utils/validation";
import { registerApi } from "../api/auth";

export default function RegisterForm(props) {
  const { setShowModal } = props;
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [signUploading, setSignUploading] = useState(false);
  const handleSubmit = (values) => {
    if (
      (values.nombre != "" &&
        values.apellidos != "" &&
        values.fechaN != "" &&
        values.password != "",
      values.repeat_password != "")
    ) {
      if (isEmailValid(values.email)) {
        if (values.password.length === 6) {
          if (values.password === values.repeat_password) {
            setSignUploading(true);
            values.fechaN = date;
            registerApi(values)
              .then((response) => {
                if (response.code === 400) {
                  Alert.alert("Advertencia", response.message);
                } else {
                  Clean(values);
                  Alert.alert("Exito", "Se ah registrado el usuario");
                  setShowModal(false);
                }
              })
              .catch(() => {
                console.log("Error en el servidor");
                setSignUploading(false);
              })
              .finally(() => {
                setSignUploading(false);
              });
          } else {
            Alert.alert("Advertencia", "Las contraseñas no coinciden");
          }
        } else {
          Alert.alert("Advertencia", "La contraseña debe tener 6 caracteres");
        }
      } else {
        Alert.alert("Advertencia", "El email es incorrecto");
      }
    } else {
      Alert.alert("Advertencia", "No puedes dejar campos vacios");
    }
  };

  const Clean = (values) => {
    values.nombre = "";
    values.email = "";
    values.apellidos = "";
    values.password = "";
    values.repeat_password = "";
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <Formik initialValues={initialValues(date)} onSubmit={handleSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.formContent}>
          <TextInput
            onChangeText={handleChange("nombre")}
            onBlur={handleBlur("nombre")}
            value={values.nombre}
            style={styles.inputs}
            placeholder="Escribe tu nombre"
            placeholderTextColor={COLORS.white}
            textContentType="nickname"
          />
          <TextInput
            onChangeText={handleChange("apellidos")}
            onBlur={handleBlur("apellidos")}
            value={values.apellidos}
            style={styles.inputs}
            placeholder="Escribe tus apellidos"
            placeholderTextColor={COLORS.white}
            textContentType="nickname"
          />
          <TextInput
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            style={styles.inputs}
            placeholder="Escribe tu email"
            placeholderTextColor={COLORS.white}
            textContentType="emailAddress"
          />
          <View style={styles.dates}>
            <Icon
              onPress={showDatepicker}
              name="calendar-alt"
              size={25}
              color={COLORS.white}
            />
            <TextInput
              placeholder="Selecciona una fecha"
              placeholderTextColor={COLORS.white}
              editable={false}
              value={moment(date).calendar()}
              style={styles.dateInput}
              onChangeText={handleChange("fechaN")}
              onBlur={handleBlur("fechaN")}
            />
          </View>

          <TextInput
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            style={styles.inputs}
            placeholder="Escribe tu contraseña"
            placeholderTextColor={COLORS.white}
            textContentType="password"
            secureTextEntry={true}
          />
          <TextInput
            onChangeText={handleChange("repeat_password")}
            onBlur={handleBlur("repeat_password")}
            value={values.repeat_password}
            style={styles.inputs}
            placeholder="Repite tu contraseña"
            placeholderTextColor={COLORS.white}
            textContentType="password"
            secureTextEntry={true}
          />
          <View style={{ flex: 5 }}>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
          <TouchableHighlight
            onPress={handleSubmit}
            style={styles.submitButton}
          >
            {!signUploading ? (
              <Text style={styles.buttonText}>Guardar</Text>
            ) : (
              <ActivityIndicator size="large" color="#ffffff" />
            )}
          </TouchableHighlight>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  inputs: {
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
    color: COLORS.medium_grey,
    padding: 5,
    marginTop: 20,
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: COLORS.primary,
    width: "90%",
    borderRadius: 50,
    height: 40,
    textAlign: "center",
  },
  buttonText: {
    marginTop: 10,
    textAlign: "center",
    color: COLORS.white,
    fontSize: 20,
  },
  dates: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dateInput: {
    width: 300,
    color: COLORS.white,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
    color: COLORS.medium_grey,
    marginLeft: 10,
  },
});

const initialValues = () => {
  return {
    nombre: "",
    email: "",
    apellidos: "",
    fechaN: "",
    password: "",
    repeat_password: "",
  };
};
