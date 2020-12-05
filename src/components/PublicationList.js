import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, __spread } from "react-native";
import { getPublicationsApi } from "../api/publication";
import { getComments } from "../api/comment";
import { map } from "lodash";
import { API_HOST } from "../utils/constants";
import { COLORS } from "../colors/colors";
import NotFound from "../assets/no-image.jpg";
import moment from "moment";
import Batman from "../assets/batman.png";
import Icon from "react-native-vector-icons/FontAwesome5";
import { addReaction, readReaction } from "../api/reactions";

export default function PublicationList(props) {
  const { user, navigation } = props;
  const [publications, setPublications] = useState(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const getPublications = async () => {
      await getPublicationsApi(user?.id, page).then((response) => {
        setPublications(response);
      });
    };
    getPublications();
  }, [user]);
  return (
    <View>
      {map(publications, (publication, index) => (
        <PublicationItem
          navigation={navigation}
          key={index}
          user={user}
          publication={publication}
        />
      ))}
    </View>
  );
}
function PublicationItem(props) {
  const { publication, user, navigation } = props;
  const [comments, setcomments] = useState(null);
  const [reactions, setReactions] = useState([]);
  const id = publication.userid;
  const avatarUrl = { uri: `${API_HOST}/mostrarAvatr?id=${id}` };
  const [fotoPub, setFotoPub] = useState(null);
  useEffect(() => {
    const getPublicationComments = async () => {
      await getComments(publication.id)
        .then((response) => {
          setcomments(response);
        })
        .catch((err) => {
          console.log("error en el codigo");
        });
    };
    getPublicationComments();
    setFotoPub({ uri: `${API_HOST}/mostrarFotoPub?id=${publication.id}` });
    const getReaction = async () => {
      await readReaction(publication.id)
        .then((response) => {
          setReactions(response);
        })
        .catch(() => {
          console.log("errro");
        });
    };
    getReaction();
  }, [publication]);
  const addReaction = async ()=>{
    let id = publication.id
    await addReaction(id).then(() => {
        console.log("exito")
      })
      .catch("error en el codigo");
  }
  return (
    <ScrollView>
      <View style={styles.userPublication}>
        <Image style={styles.avatar} source={Batman} />
        <View>
          <Text style={styles.name}>
            {user?.nombre} {user?.apellidos}
          </Text>
          <Text style={styles.date}>
            {moment(publication.fechaPublicacion).calendar()}
          </Text>
        </View>
      </View>
      <Text style={styles.publication}>{publication.publicacion}</Text>
      <View style={{ width: "100%", height: 250 }}>
        {publication.foto && <Image style={styles.fotoPub} source={fotoPub} />}
      </View>
      <Text style={styles.tecnologias}>#{publication.tecnologias}</Text>
      <View style={styles.moreInfo}>
        <View style={styles.reactions}>
          <Icon onPress={addReaction} name="heart" size={30} color={COLORS.white} />
          <Text style={styles.countReactions}>
            {reactions ? reactions.length : null}
          </Text>
        </View>
        <View style={styles.comments}>
          <Icon
            name="comment-alt"
            onPress={() =>
              navigation.navigate("Comment", {
                user: user,
                publication: publication,
                comments: comments,
              })
            }
            size={30}
            color={COLORS.white}
            solid
          />
          <Text
            style={styles.countReactions}
            onPress={() =>
              navigation.navigate("Comment", {
                user: user,
                publication: publication,
              })
            }
          >
            {comments ? comments.length : 0}
          </Text>
        </View>
      </View>
      <View style={styles.hr} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 90,
    bottom: -2,
  },
  userPublication: {
    marginLeft: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  name: {
    color: COLORS.white,
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 18,
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
  fotoPub: {
    flex: 1,
    width: null,
    resizeMode: "stretch",
  },
});
