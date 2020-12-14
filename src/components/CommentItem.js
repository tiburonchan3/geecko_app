import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getUserApi } from "../api/user";
import { API_HOST } from "../utils/constants";
import Batman from "../assets/batman.png";
import { COLORS } from "../colors/colors";
import moment from "moment";
import { getReactionsComment } from "../api/reactions";
import ReactionComments from "./ReactionComment";

export default function CommentItem(props) {
  const { comment } = props;
  const [user, setUser] = useState(null);
  const [refresh,setRefresh] = useState(false)
  const [reactions, setReactions] = useState([]);
  const getUser = async () => {
    await getUserApi(comment.userid)
      .then((response) => {
        setUser(response);
      })
      .catch(() => {
        console.log("error en el codigo");
      });
  };
  const getReactions = async ()=>{
      getReactionsComment(comment.id).then(response=>{
          setReactions(response || [])
      })
  }
  useEffect(() => {
    getUser();
    getReactions();
  }, [props,refresh]);
  const avatarUrl = { uri: `${API_HOST}/mostrarAvatr?id=${user?.id}` };
  return (
    <View>
      <View style={styles.userComment}>
        <Image style={styles.avatar} source={avatarUrl} />
        <View>
          <Text style={styles.name}>
            {user?.nombre} {user?.apellidos}
          </Text>
          <Text style={styles.date}>
            {moment(comment.fechacomentario).calendar()}
          </Text>
        </View>
      </View>
      <View style={styles.commentBox}>
        <Text style={styles.comment}>{comment.comentario}</Text>
      </View>
       <ReactionComments setRefresh={setRefresh} id={comment.id} reactions={reactions}/>
      <View style={styles.hr} />
    </View>
  );
}
const styles = StyleSheet.create({
  name: {
    color: COLORS.white,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 90,
  },
  userComment: {
    marginLeft: 20,
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  hr: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "5%",
    width: "90%",
    height: 1,
    backgroundColor: COLORS.grey,
  },
  date: {
    color: COLORS.grey,
    fontSize: 12,
    marginLeft: 10,
  },
  commentBox: {
    backgroundColor: COLORS.blue_dark_two,
    width: "90%",
    height: "auto",
    marginLeft: "5%",
    padding: 20,
  },
  comment: {
    color: COLORS.ligth_blue,
  },

});
