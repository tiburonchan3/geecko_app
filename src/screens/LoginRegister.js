import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Keyboard
} from "react-native";
import Login from "../components/Login";
import { COLORS } from "../colors/colors";
import geecko from "../assets/geckoo.png";
import Register from "../components/Register";
import Splash from "../components/Splash";

export default function LoginRegister(props) {
  const { setRefreshLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const [key, setKey] = useState(true);
  const [show, setShow] = useState(false);
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);
  const _keyboardDidShow = () => {
    setKey(false);
  };
  const _keyboardDidHide = () => {
    setKey(true);
  };
  return (
    <View style={styles.body}>
      <Image style={styles.image} source={geecko} />
      <Login setShow={setShow} setRefreshLogin={setRefreshLogin} />
      {key && (
        <TouchableHighlight
          style={styles.reg}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.text}>Aun no tienes una cuenta?</Text>
        </TouchableHighlight>
      )}
      <Register setShowModal={setShowModal} showModal={showModal} />
      {show && <Splash/>}
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.blue_dark_one,
    width: "100%",
    height: "100%",
  },
  image: {
    width: 200,
    height: 200,
    position: "absolute",
    top: "10%",
    left: "20%",
  },
  text: {
    position: "relative",
    zIndex: 2,
    color: COLORS.white,
    fontSize: 20,
    left: "20%",
  },
  reg: {
    right: 10,
    bottom: 50,
    position: "absolute",
    width: 300,
  },
});

