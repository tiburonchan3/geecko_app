import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import BannerAvatar from "../components/BannerAvatar";
import UserInfo from "../components/UserInfo";
import { getUserApi } from "../api/user";
import { COLORS } from "../colors/colors";
import UserEditModal from "../components/UserEditModal";
import PublicationList from "../components/PublicationList";
import PublicationModal from "../components/PublicationModal";
import useAuth from "../hooks/useAuth";
import { checkFollowApi } from "../api/friends";
import Follow from "../components/Follow";
import { getPublicationsApi } from "../api/publication";

export default function Account(props) {
  const [showModal, setShowModal] = useState(false);
  const [showModalP, setShowModalP] = useState(false);
  const { route, navigation } = props;
  const { params } = route;
  const [userInfo, setUserInfo] = useState(null);
  const [refreshInfo, setRefreshInfo] = useState(false);
  const [refreshPublications, setRefreshPublications] = useState(false);
  const [check, setCheck] = useState(false);
  const user = useAuth();
  const [publications, setPublications] = useState(null);
  const [page, setPage] = useState(1);
  const getUserInfo = async () => {
    await getUserApi(params.user._id)
      .then((response) => {
        setUserInfo(response);
      })
      .catch(() => {
        console.log("Error en el codigo");
      });
  };
  const checkFollow = async () => {
    await checkFollowApi(params.user._id)
      .then((response) => {
        setCheck(response.status);
      })
      .catch(() => {
        console.log("error de codigo");
      });
  };
  useEffect(() => {
    getUserInfo();
    if (user._id !== params.user._id) {
      checkFollow();
    }
  }, [params, refreshInfo]);
  const getPublications = async () => {
    await getPublicationsApi(userInfo?.id, page).then((response) => {
      setPublications(response);
    });
  };
  useEffect(() => {
    getPublications();
  }, [userInfo, refreshPublications]);
  return (
    <ScrollView style={styles.body}>
      <Text style={styles.name}>
        {userInfo?.nombre} {userInfo?.apellidos}
      </Text>
      <BannerAvatar user={userInfo} />
      <UserInfo
        refreshInfo={refreshInfo}
        setRefreshInfo={setRefreshInfo}
        user={userInfo}
      />
      <View>
        {user._id === params.user._id ? (
          <TouchableHighlight
            onPress={() => setShowModal(true)}
            style={styles.editButton}
          >
            <Text style={styles.textButton}>Editar Perfil</Text>
          </TouchableHighlight>
        ) : (
          <Follow check={check} />
        )}

        <UserEditModal
          navigation={navigation}
          user={userInfo}
          setRefreshInfo={setRefreshInfo}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      </View>
      <View>
        <Text style={styles.publications}>Lista de Publicaciones</Text>
        {user._id === params.user._id && (
          <TouchableHighlight
            onPress={() => setShowModalP(true)}
            style={styles.addButton}
          >
            <Text style={styles.textAddButton}>Agregar</Text>
          </TouchableHighlight>
        )}
        <PublicationModal
          setRefreshPublications={setRefreshPublications}
          showModalP={showModalP}
          setShowModalP={setShowModalP}
        />
        <PublicationList navigation={navigation} user={userInfo} publications={publications} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: COLORS.blue_dark_one,
    height: "100%",
  },
  name: {
    color: COLORS.grey,
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  editButton: {
    position: "absolute",
    marginLeft: 90,
    right: 25,
    top: -55,
    width: 150,
    height: 35,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
  },
  textButton: {
    textAlign: "center",
    fontSize: 15,
    color: COLORS.white,
    marginTop: 5,
  },
  publications: {
    color: COLORS.white,
    fontSize: 25,
    textAlign: "center",
  },
  addButton: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    width: 100,
    padding: 5,
    marginLeft: 20,
    marginTop: 5,
    borderRadius: 20,
  },
  textAddButton: {
    color: COLORS.white,
    textAlign: "center",
  },
});
