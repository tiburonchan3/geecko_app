import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome5";
import { COLORS } from "../colors/colors";

export default function UserInfo({ user, refreshInfo }) {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    setUserInfo(user);
  }, [user, refreshInfo]);
  return (
    <View style={styles.body}>
      <View style={styles.Item}>
        <Icon color={COLORS.white} name="at" size={20} />
        <Text style={(styles.textInfo, styles.email)}>{userInfo?.email}</Text>
      </View>
      <Text style={styles.biografia}>{userInfo?.biografia}</Text>
      <View style={styles.hr} />
      {userInfo?.SitioWeb ? (
        <View style={styles.Item}>
          <Icon color={COLORS.white} name="link" size={20} />
          <Text style={styles.textInfo}>{userInfo?.SitioWeb}</Text>
        </View>
      ) : null}
      <View style={styles.Item}>
        <Icon color={COLORS.white} name="map-marker-alt" size={20} />
        <Text style={styles.textInfo}>{userInfo?.ubicacion}</Text>
      </View>
      <View style={styles.Item}>
        <Icon color={COLORS.white} name="birthday-cake" size={20} />
        <Text style={styles.textInfo}>
          {moment(userInfo?.fechaN).calendar()}
        </Text>
      </View>
      <View style={styles.hr} />
    </View>
  );
}

const styles = StyleSheet.create({
  textInfo: {
    color: COLORS.grey,
    fontSize: 15,
    marginBottom: 15,
    marginLeft: 10,
  },
  Item: {
    marginLeft: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  body: {
    marginTop: 15,
  },
  hr: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "5%",
    width: "90%",
    height: 1,
    backgroundColor: COLORS.grey,
  },
  email: {
    color: COLORS.medium_grey,
    marginLeft: 5,
  },
  biografia: {
    color: COLORS.grey,
    fontSize: 15,
    marginLeft: 15,
  },
});
