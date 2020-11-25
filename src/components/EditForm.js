import React, { useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet, Alert, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { COLORS } from "../colors/colors";
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import { EditUserApi } from "../api/user";

export default function EditForm(props) {
    const { user, navigation, setRefreshInfo, setShowModal } = props;
    const [date, setDate] = useState(new Date(Date.parse(user?.fechaN)));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const handleSubmit = (values) => {
        values.fechaN = date;
        EditUserApi(values).then(response => {
            Keyboard.dismiss();
            Alert.alert('Exito', 'Se guardaron los cambios', [
                { text: 'Aceptar', onPress: () => { navigation.navigate("Home") } }
            ])
            setShowModal(false)
            setRefreshInfo(true)

        }).catch(err => {
            console.log("error en el codigo xdxd")
        })
    }
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
        showMode('date');
    };
    return (
        <Formik
            initialValues={initial(user, date)}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.formContent}>
                    <TextInput
                        onChangeText={handleChange("nombre")}
                        onBlur={handleBlur("nombre")}
                        value={values.nombre}
                        style={styles.inputs}
                        placeholder="Escribe tu nombre"
                        placeholderTextColor={COLORS.white}
                        textContentType="emailAddress"
                    />
                    <TextInput
                        onChangeText={handleChange("apellidos")}
                        onBlur={handleBlur("apellidos")}
                        value={values.apellidos}
                        style={styles.inputs}
                        placeholder="Escribe tus apellidos"
                        placeholderTextColor={COLORS.white}
                        textContentType="emailAddress"
                    />
                    <TextInput
                        onChangeText={handleChange("ubicacion")}
                        onBlur={handleBlur("ubicacion")}
                        value={values.ubicacion}
                        style={styles.inputs}
                        placeholder="Escribe tu ubicacion"
                        placeholderTextColor={COLORS.white}
                        textContentType="emailAddress"
                    />
                    <TextInput
                        onChangeText={handleChange("biografia")}
                        onBlur={handleBlur("biografia")}
                        value={values.biografia}
                        style={styles.inputs}
                        placeholder="Escribe tu biografia"
                        placeholderTextColor={COLORS.white}
                        textContentType="emailAddress"
                        multiline={true}
                        numberOfLines={4}
                    />
                    <View style={styles.dates}>
                        <Icon onPress={showDatepicker} name="calendar-alt" size={25} color={COLORS.white} />
                        <TextInput placeholder="Selecciona una fecha"
                            placeholderTextColor={COLORS.white}
                            editable={false}
                            value={moment(date).calendar()}
                            style={styles.dateInput}
                            onChangeText={handleChange("fechaN")}
                            onBlur={handleBlur("fechaN")}
                        />
                    </View>

                    <TextInput
                        onChangeText={handleChange("sitioweb")}
                        onBlur={handleBlur("sitioweb")}
                        value={values.sitioweb}
                        style={styles.inputs}
                        placeholder="Escribe tu sitioweb"
                        placeholderTextColor={COLORS.white}
                        textContentType="emailAddress"
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
                        <Text style={styles.buttonText}>Guardar</Text>
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
        marginTop: 20
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
        textAlign: 'center',
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
    }
});

const initial = (user) => {
    return {
        nombre: user?.nombre || "",
        apellidos: user?.apellidos || "",
        sitioweb: user?.SitioWeb || "",
        ubicacion: user?.ubicacion || "",
        fechaN: user?.fechaN || "",
        biografia: user?.biografia || ""
    }
}
