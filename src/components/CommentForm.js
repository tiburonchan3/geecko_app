import React,{useState} from 'react';
import { View, Text,TextInput,TouchableHighlight,StyleSheet,Alert,Keyboard } from 'react-native';
import {saveComment} from '../api/comment';
import {Formik} from 'formik'
import {COLORS} from '../colors/colors';

export default function CommentForm(props) {
    const {id,setRefreshComments} = props
    const handleSubmit = async (values)=> {
        Keyboard.dismiss();
        let data = JSON.stringify(values)
            await saveComment(id,data).then(response=>{
                values.comentario = "",
                Alert.alert('Exito','Se guardo el comentario con exito',[
                    {
                        text: "Aceptar",
                        onPress: () => {
                            setRefreshComments(true)
                        },
                      },
                ])
            }).catch(()=>{
                console.log("error en el codigo")
            })
        }
  return (
    <Formik initialValues={{comentario:""}} onSubmit={handleSubmit}>
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View style={styles.formContent}>
        <TextInput
          onChangeText={handleChange("comentario")}
          onBlur={handleBlur("comentario")}
          value={values.comentario}
          style={styles.inputs}
          placeholder="Escribe tu comentario"
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
  );
}
const styles = StyleSheet.create({
    inputs: {
        borderColor: COLORS.white,
        borderWidth: 2,
        width: 250,
        height: 80,
        marginBottom: 70,
        padding: 10,
        fontSize: 15,
        color: COLORS.white,
      },
      submitButton: {
          marginLeft: 30,
          marginTop:30,
        backgroundColor: COLORS.primary,
        width: 100,
        borderRadius: 50,
        height: 30,
        textAlign: "center",
      },
      formContent: {
        marginLeft: 15,
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",

      },
      buttonText: {
        marginTop: 5,
        textAlign: 'center',
        color: COLORS.white,
        fontSize: 15,
      },
})
