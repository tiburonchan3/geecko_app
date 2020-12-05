import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import * as Auth from "../api/auth";
import Icon from "react-native-vector-icons/FontAwesome5";
import geecko from "../assets/geckoo.png";
import { COLORS } from "../colors/colors";
import useAuth from '../hooks/useAuth';

export default function componentName({props,setRefreshLogin}) {
  const {navigation} = props
  const userLog = useAuth()
  const Logout = async () => {
    await Auth.logout();
    setRefreshLogin(true);
  };
  return (
    <View style={styles.drawerBody}>
      <View style={styles.drawerContent}>
        <Image style={styles.drawerLogo} source={geecko} />
        <View style={styles.drawerItem}>
          <Icon style={styles.drawerItemIcon} size={20} color={COLORS.white} name="home" />
          <Text onPress={()=>navigation.navigate("Home")} style={styles.drawerItemText}>Inicio</Text>
        </View>
        <View style={styles.drawerItem}>
          <Icon style={styles.drawerItemIcon} size={20} color={COLORS.white} name="user-friends" />
          <Text onPress={()=>navigation.navigate("Friends")} style={styles.drawerItemText}>Amigos</Text>
        </View>
        <View style={styles.drawerItem}>
          <Icon style={styles.drawerItemIcon} size={20} color={COLORS.white} name="user-alt" />
          <Text onPress={()=>navigation.navigate("Account",{user: userLog})} style={styles.drawerItemText}>Mi Cuenta</Text>
        </View>
        <View style={styles.drawerItem}>
          <Icon style={styles.drawerItemIcon} size={20} color={COLORS.white} name="sign-out-alt" />
          <Text style={styles.drawerItemText} onPress={Logout}>Cerrar Sesion</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerBody: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.blue_dark_two,
  },
  drawerContent: {
    marginTop: 50,
  },
  drawerLogo: {
    width: 200,
    height: 200,
    marginTop: 100,
    marginLeft: 30,
  },
  drawerItem: {
    marginLeft:20,
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  drawerItemText: {
    marginLeft: 10,
    color: COLORS.white,
    fontSize: 25,
    fontWeight: "bold",
  },
  drawerItemIcon: {
      marginTop:5
  }
});
