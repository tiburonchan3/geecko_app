import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import { COLORS } from "../colors/colors";

export default function Follow(props) {
  const { check } = props;
  return (
    <View>
      {check ? (
        <TouchableHighlight style={styles.followButton}>
          <Text style={styles.textButton}>Dejar de seguir</Text>
        </TouchableHighlight>
      ) : (
        <TouchableHighlight style={styles.followButton}>
          <Text style={styles.textButton}>Seguir</Text>
        </TouchableHighlight>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  followButton: {
    position: "absolute",
    marginLeft: 90,
    right: 25,
    top: -55,
    width: 150,
    height: 35,
    backgroundColor:COLORS.primary,
    borderRadius: 50,
  },
  textButton: {
    textAlign: "center",
    fontSize: 15,
    color: COLORS.white,
    marginTop: 5,
  },
});
