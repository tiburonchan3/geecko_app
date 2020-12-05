import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { COLORS } from "../colors/colors";
import RegisterForm from "./RegisterForm";

export default function Register(props) {
  const { setShowModal, showModal } = props;
  return (
    <View>
      <Modal isVisible={showModal}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edita tu Informacion!</Text>
            <FontAwesome5Icon
              onPress={() => setShowModal(false)}
              style={styles.iconClose}
              name="times"
            />
          </View>
          <View />
          <View>
            <RegisterForm setShowModal={setShowModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  modal: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: COLORS.blue_dark_two,
  },
  modalHeader: {
    padding: 10,
  },
  modalTitle: {
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.medium_grey,
  },
  iconClose: {
    position: "absolute",
    right: 5,
    fontSize: 25,
    color: COLORS.medium_grey,
  },
});
