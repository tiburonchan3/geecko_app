import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet,ScrollView } from "react-native";
import { API_HOST } from "../utils/constants";
import { COLORS } from "../colors/colors";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome5";
import CommentForm from "../components/CommentForm";
import CommentItem from "../components/CommentItem";
import { map } from "lodash";
import { getComments } from "../api/comment";
import Batman from '../assets/batman.png'
import { readReaction } from "../api/reactions";

export default function Comment(props) {
  const { route } = props;
  const { params } = route;
  const { user, publication } = params;
  const [comments, setComments] = useState([]);
  const [fotoPub, setFotoPub] = useState(null)
  const [refreshComments, setRefreshComments] = useState(false)
  const avatarUrl = { uri: `${API_HOST}/mostrarAvatr?id=${user.id}` };
  useEffect(() => {
    const getAllComments = async () => {
      await getComments(publication?.id)
        .then((response) => {
          setComments(response || []);
        })
        .catch(() => {
          console.log("error en el codigo");
        });
    };
    getAllComments();
    const getReactions = async()=>{
        await readReaction(publication?.id).then((response)=>{
            console.log(response || [])
        }).then(()=>{
            console.log("error")
        })
    }
    getReactions();
    setFotoPub({uri : `${API_HOST}/mostrarFotoPub?id=${publication?.id}`})
  }, [props,refreshComments]);
  return (
    <ScrollView style={styles.body}>
      <View style={styles.userPublication}>
        <Image style={styles.avatar} source={Batman} />
        <View>
          <Text style={styles.name}>
            {user.nombre} {user.apellidos}
          </Text>
          <Text style={styles.date}>
            {moment(publication?.fechaPublicacion).calendar()}
          </Text>
        </View>
      </View>
      <Text style={styles.publication}>{publication?.publicacion}</Text>
      <View style={{width:'100%',height:250}}>
        {
            publication.foto &&(
                <Image style={styles.fotoPub} source={fotoPub}/>
            )
        }
        </View>
      <Text style={styles.tecnologias}>#{publication?.tecnologias}</Text>
      <View style={styles.moreInfo}>
        <View style={styles.reactions}>
          <Icon name="heart" size={30} color={COLORS.white} />
          <Text style={styles.countReactions}>250</Text>
        </View>
        <View style={styles.comments}>
          <Icon name="comment-alt" size={30} color={COLORS.white} solid />
          <Text style={styles.countReactions}>
            {comments ? comments.length : 0}
          </Text>
        </View>
      </View>
      <View style={styles.hr} />
      <CommentForm id={publication.id} setRefreshComments={setRefreshComments}/>
      {map(comments, (comment, index) => (
        <CommentItem comment={comment} key={index} />
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.blue_dark_one,
    height: "100%",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 90,
    bottom: -2,
  },
  userPublication: {
    marginLeft: 15,
    marginTop: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  name: {
    color: COLORS.white,
    fontSize: 18,
    marginTop: 15,
    marginLeft: 5,
  },
  date: {
    color: COLORS.grey,
    fontSize: 12,
    marginLeft: 15,
  },
  code: {
    color: COLORS.primary,
  },
  codeBlock: {
    width: "90%",
    padding: "5%",
    marginLeft: "5%",
    backgroundColor: COLORS.blue_dark_two,
  },
  publication: {
    color: COLORS.white,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  tecnologias: {
    color: COLORS.blue,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  moreInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  reactions: {
    marginLeft: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  comments: {
    marginLeft: 40,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  countReactions: {
    fontSize: 20,
    color: COLORS.white,
    marginLeft: 10,
  },
  hr: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "5%",
    width: "90%",
    height: 1,
    backgroundColor: COLORS.grey,
  },
  fotoPub:{
    flex: 1,
    width: null,
    resizeMode: "stretch"

  }
});
