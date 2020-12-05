import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { COLORS } from "../colors/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import PublicationForm from './PublicationForm';

export default function PublicationModal(props) {
  const {showModalP, setShowModalP} = props;
  return (
    <View>
      <Modal isVisible={showModalP}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Agrega una publicacion!</Text>
            <Icon
              onPress={() => setShowModalP(false)}
              style={styles.iconClose}
              name="times"
              size={18}
              color={COLORS.white}
            />
          </View>
          <View style={styles.hr} />
            <PublicationForm/>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  modal: {
    borderRadius: 10,
    padding: 20,
    height:350,
    backgroundColor: COLORS.blue_dark_two,
  },
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.medium_grey,
  },
  modalHeader: {
    padding: 5,
  },
  modalTitle: {
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  iconClose: {
    position: "absolute",
    right: 5,
  },
});
