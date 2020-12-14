import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { API_HOST } from "../utils/constants";
import Batman from "../assets/batman.png";
import { COLORS } from "../colors/colors";
import { getUserApi } from "../api/user";

export default function FriendItem(props) {
  const { friend, navigation } = props;
  const [userInfo, setUserInfo] = useState(null);
  const getUser = async () => {
    await getUserApi(friend.id)
      .then((response) => {
        setUserInfo(response);
      })
      .catch(() => {
        console.log("Error en el codigo");
      });
  };
  useEffect(() => {
    getUser();
  }, [friend]);
  console.log(user(userInfo));
  const avatarUrl = { uri: `${API_HOST}/mostrarAvatr?id=${friend.id}` };
  return (
    <View>
      <TouchableHighlight
        onPress={() => navigation.navigate("Account", { user: user(userInfo) })}
      >
        <View style={styles.friends}>
          <Image
            style={styles.image}
            source={friend.avatar ? avatarUrl : Batman}
          ></Image>
          <View>
            <Text style={styles.name}>
              {friend.nombre} {friend.apellidos}
            </Text>
            <Text style={styles.bio}>{userInfo?.biografia}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  friends: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    marginLeft: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  name: {
    color: COLORS.white,
    marginTop: 15,
    marginLeft: 10,
  },
  bio: {
    color: COLORS.grey,
    marginLeft: 10,
    fontSize: 10,
  },
});
function user(userInfo) {
  return {
    _id: userInfo?.id,
  };
}
