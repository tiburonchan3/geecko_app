import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { COLORS } from "../colors/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import EditForm from './EditForm';

export default function UserEditModal(props) {
  const {navigation, showModal, setShowModal,user,setRefreshInfo } = props;
  return (
    <View>
      <Modal isVisible={showModal}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edita tu Informacion!</Text>
            <Icon
              onPress={() => setShowModal(false)}
              style={styles.iconClose}
              name="times"
              size={18}
              color={COLORS.white}
            />
          </View>
          <View style={styles.hr} />
          <View>
          <EditForm navigation={navigation} setRefreshInfo={setRefreshInfo} setShowModal={setShowModal} user={user}/>
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
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.medium_grey,
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
  iconClose: {
    position: "absolute",
    right: 5,
  },
});
