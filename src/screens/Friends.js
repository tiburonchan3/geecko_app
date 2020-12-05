import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
} from "react-native";
import { COLORS } from "../colors/colors";
import { getFollowFriends } from "../api/friends";
import { map } from "lodash";
import FriendItem from "../components/FriendItem";

export default function Friends({navigation}) {
    console.log(navigation)
  const [type, setType] = useState("follow");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getFriends = async () => {
      await getFollowFriends(page, type, search)
        .then((response) => {
          setFriends(response || []);
        })
        .catch(() => {
          console.log("error de codigo");
        });
    };
    getFriends();
  }, [type, search]);
  return (
    <ScrollView style={styles.body}>
      <View style={styles.options}>
        <TouchableHighlight
          onPress={() => setType("follow")}
          style={type === "follow" ? styles.active : styles.inactive}
        >
          <Text style={styles.text}>Siguiendo</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => setType("new")}
          style={type === "new" ? styles.active : styles.inactive}
        >
          <Text style={styles.text}>Nuevos</Text>
        </TouchableHighlight>
      </View>
      <TextInput
        onChangeText={(text) => setSearch(text)}
        placeholder="Escribe para buscar"
        placeholderTextColor={COLORS.grey}
        style={styles.input}
      ></TextInput>
      <View>
        {map(friends, (friend, index) => (
          <FriendItem navigation={navigation} key={index} friend={friend} />
        ))}
        {friends.length <= 0 && (
          <Text style={styles.none}>No se encontraron usuarios</Text>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.blue_dark_one,
    height: "100%",
  },
  options: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  active: {
    padding: 10,
    textAlign: "center",
    backgroundColor: COLORS.primary,
    width: "50%",
  },
  inactive: {
    padding: 10,
    borderColor: COLORS.primary,
    borderWidth: 1,
    width: "50%",
  },
  text: {
    textAlign: "center",
    color: COLORS.white,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    width: 350,
    marginLeft: 35,
    marginTop: 20,
    padding: 10,
    height: 40,
    borderRadius: 5,
    color: COLORS.white,
  },
  none: {
    color: COLORS.grey,
    fontSize: 25,
    marginTop: 20,
    marginLeft: 35,
  },
});
