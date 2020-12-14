import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { COLORS } from "../colors/colors";
import useAuth from "../hooks/useAuth";
import {addReactionComment} from '../api/reactions'

export default function ReactionComments(props) {
  const { reactions,id,setRefresh } = props;
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [userDislike, setUserDislike] = useState([]);
  const user = useAuth();
  useEffect(() => {
    setLikes(reactions.filter((react) => react.reactcomment === "1"));
    setDislikes(reactions.filter((react) => react.reactcomment === "2"));
    setUserDislike(
      reactions.filter(
        (react) => react.userId === user._id && react.reactcomment === "2"
      )
    );
    setUserLike(
      reactions.filter(
        (react) => react.userId === user._id && react.reactcomment === "1"
      )
    );
  }, [props, user, reactions]);
  const Reaction = async (react)=>{

}
const addR = async (react)=>{
    if(userLike.length >  0 || userDislike.length > 0) {
        console.log("Aqui se podra editar la reaccion de 1 a 2 o de 2 a 1")
    }else{
        await addReactionComment(id,react).then(()=>{
            setRefresh(true)
        }).catch(()=>{
        console.log("error al agregar la reaccion")
    })
    }
}
  return (
    <View style={styles.moreInfo}>
      {userLike.length > 0 ? (
        <View style={styles.likes}>
          <Icon name="thumbs-up" size={25} color={COLORS.primary} />
          <Text style={styles.countReactions}>
            {likes.length > 0 ? likes.length : ""}
          </Text>
        </View>
      ) : (
        <View style={styles.likes}>
          <Icon name="thumbs-up" onPress={()=>addR(1)} size={25} color={COLORS.white} />
          <Text style={styles.countReactions}>
            {likes.length > 0 ? likes.length : ""}
          </Text>
        </View>
      )}

      {userDislike.length > 0 ? (
        <View style={styles.likes}>
          <Icon name="thumbs-down" size={25} color={COLORS.primary} />
          <Text style={styles.countReactions}>
            {dislikes.length > 0 ? dislikes.length : ""}
          </Text>
        </View>
      ) : (
        <View style={styles.likes}>
          <Icon name="thumbs-down" onPress={()=>addR(2)} size={25} color={COLORS.white} />
          <Text style={styles.countReactions}>
            {dislikes.length > 0 ? dislikes.length : ""}
          </Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  likes: {
    marginLeft: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dislikes: {
    marginLeft: 40,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  countReactions: {
    fontSize: 15,
    color: COLORS.white,
    marginLeft: 10,
  },
  moreInfo: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
