import React, { useEffect, useState } from "react";
import { getPublicationsApi } from "../api/publication";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { map } from "lodash";
import { API_HOST } from "../utils/constants";
import { COLORS } from "../colors/colors";
import NotFound from "../assets/no-image.jpg";
import moment from "moment";

export default function PublicationList(props) {
  const { user } = props;
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
    <ScrollView>
      {map(publications, (publication, index) => (
        <PublicationItem key={index} user={user} publication={publication} />
      ))}
    </ScrollView>
  );
}
function PublicationItem(props) {
  const { publication, user } = props;
  const id = publication.userid;
  const avatarUrl = { uri: `${API_HOST}/mostrarAvatr?id=${id}` };
  return (
    <View>
      <View style={styles.userPublication}>
        <Image style={styles.avatar} source={avatarUrl || NotFound} />
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
        <View style={styles.codeBlock}>
          <Text style={styles.code}>{publication.code}</Text>
        </View>
        <Text style={styles.tecnologias}>#{publication.tecnologias}</Text>
      <View style={styles.hr} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 90,
    bottom: -2,
    borderWidth: 5,
    borderColor: COLORS.blue_dark_one,
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
      color:COLORS.white,
      marginLeft: 20,
      marginBottom: 10,
      marginTop:10
  },
  tecnologias: {
    color:COLORS.blue,
    marginLeft: 20,
    marginBottom: 10,
    marginTop:10
  }
});
