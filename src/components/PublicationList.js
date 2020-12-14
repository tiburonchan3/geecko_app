import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  __spread,
} from "react-native";
import { getComments } from "../api/comment";
import { map } from "lodash";
import { API_HOST } from "../utils/constants";
import { COLORS } from "../colors/colors";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome5";
import { addReaction, deleteReaction, readReaction } from "../api/reactions";
import useAuth from "../hooks/useAuth";
import { getUserApi } from "../api/user";

export default function PublicationList(props) {
  const { user, navigation, publications } = props;
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
  const [refreshReactions, setRefreshReactions] = useState(false);
  const [userReact, setUserReact] = useState([]);
  const [fotoPub, setFotoPub] = useState(null);
  const [userPub, setUserPub] = useState([]);
  let avatarUrl = {};
  const userLog = useAuth();
  const getPublicationComments = async () => {
    await getComments(publication.id)
      .then((response) => {
        setcomments(response);
      })
      .catch(() => {
        console.log("error en el codigo");
      });
  };
  const getReaction = async () => {
    await readReaction(publication.id)
      .then((response) => {
        setReactions(response);
      })
      .catch(() => {
        console.log("errro");
      });
  };
  const getUserInfo = async () => {
    await getUserApi(publication.userid)
      .then((response) => {
        setUserPub(response);
      })
      .catch(() => {
        console.log("Error en el codigo");
      });
  };
  useEffect(() => {
    getPublicationComments();
    setFotoPub({ uri: `${API_HOST}/mostrarFotoPub?id=${publication.id}` });
    getReaction();
    getUserInfo();
  }, [publication, refreshReactions]);
  const Reaction = async () => {
    let id = publication.id;
    await addReaction(id)
      .then(() => {
        setRefreshReactions(true);
      })
      .catch("error en el codigo");
  };
  const DelReaction = async () => {
    let id = publication.id;
    await deleteReaction(id)
      .then(() => {
        setRefreshReactions(true);
      })
      .catch("error en el codigo");
  };

  useEffect(() => {
    if (reactions) {
      setUserReact(reactions.filter((react) => react.userid === userLog._id));
    }
  }, [reactions]);
  avatarUrl = { uri: `${API_HOST}/mostrarAvatr?id=${userPub?.id}` };
  return (
    <ScrollView style={{ marginTop: 20 }}>
      <View style={styles.userPublication}>
        <Image style={styles.avatar} source={avatarUrl} />
        <View>
          <Text style={styles.name}>
            {userPub?.nombre} {userPub?.apellidos}
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
        <View>
          {userReact.length > 0 ? (
            <View style={styles.reactions}>
              <Icon
                onPress={DelReaction}
                solid
                name="heart"
                size={30}
                color={COLORS.pink}
              />
              <Text style={styles.countReactions}>
                {reactions ? reactions.length : null}
              </Text>
            </View>
          ) : (
            <View style={styles.reactions}>
              <Icon
                onPress={Reaction}
                name="heart"
                size={30}
                color={COLORS.white}
              />
              <Text style={styles.countReactions}>
                {reactions ? reactions.length : null}
              </Text>
            </View>
          )}
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
