import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { GetAllPublicationApi } from "../api/publication";
import { COLORS } from "../colors/colors";
import PublicationList from "../components/PublicationList";
import useAuth from "../hooks/useAuth";

export default function Home(props) {
    const {navigation} = props
  const user = useAuth();
  const [publications, setPublications] = useState([]);
  const getPublications = async () => {
    await GetAllPublicationApi().then((response) => {
      setPublications(formatModel(response));
    });
  };
  useEffect(() => {
    getPublications();
  }),
    [];
  return (
    <ScrollView style={styles.body}>
      <Text style={styles.textFriend}>Publicaciones de tus amigos</Text>
      {publications ? (
        <PublicationList navigation={navigation} user={user} publications={publications} />
      ) : (
        <Text>No hay Publicaciones para mostrar</Text>
      )}
    </ScrollView>
  );
}

function formatModel(publications) {
  const tempPublication = [];
  if (publications) {
    if (publications.length > 0) {
      publications.forEach((publication) => {
        tempPublication.push({
          id: publication.Publicacion._id,
          foto: publication.Publicacion.foto,
          userid: publication.userRelationid,
          publicacion: publication.Publicacion.publicacion,
          fechaPublicacion: publication.Publicacion.fecha,
          tecnologias: publication.Publicacion.tecnologias,
        });
      });
    }
  }
  return tempPublication;
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.blue_dark_one,
    height: "100%",
  },
  textFriend: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
  },
});
