import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { API_HOST } from "../utils/constants";
import { COLORS } from "../colors/colors";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import useAuth from "../hooks/useAuth";
import BannerAvatarEdit from "./BannerAvatarEdit";

export default function BannerAvatar(props) {
  const { user } = props;
  const bannerUrl = { uri: `${API_HOST}/mostrarBanner?id=${user?.id}` };
  const avatarUrl = { uri: `${API_HOST}/mostrarAvatr?id=${user?.id}` };
  return (
    <View>
      <Image style={styles.banner} source={bannerUrl} />
      <Image style={styles.avatar} source={avatarUrl} />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    height: 200,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 90,
    position: "absolute",
    bottom: -2,
    borderWidth: 5,
    borderColor: COLORS.blue_dark_one,
  },
  icon: {
    position: "absolute",
    right: 0,
    padding: 5,
    bottom: 0,
    backgroundColor: COLORS.white,
  },
});
