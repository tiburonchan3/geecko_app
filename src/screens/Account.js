import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight,ScrollView } from 'react-native';
import BannerAvatar from '../components/BannerAvatar';
import UserInfo from '../components/UserInfo';
import { getUserApi } from '../api/user';
import { COLORS } from '../colors/colors';
import UserEditModal from '../components/UserEditModal';
import PublicationList from '../components/PublicationList';

export default function componentName(props) {
    const [showModal, setShowModal] = useState(false)
    const [publications, setPublications] = useState(null)
    const { route,navigation } = props
    const { params } = route
    const [userInfo, setUserInfo] = useState(null)
    const [refreshInfo, setRefreshInfo] = useState(false)
    useEffect(() => {
        const getUserInfo = async () => {
            await getUserApi(params.user._id).then(response => {
                setUserInfo(response)
            }).catch(err => {
                console.log(err)
            });
        }
        getUserInfo();
    }, [params, refreshInfo])
    return (
        <ScrollView style={styles.body}>
            <Text style={styles.name}>{userInfo?.nombre} {userInfo?.apellidos}</Text>
            <BannerAvatar user={userInfo} />
            <UserInfo refreshInfo={refreshInfo} setRefreshInfo={setRefreshInfo} user={userInfo} />
            <View>
                <TouchableHighlight onPress={() => setShowModal(true)} style={styles.editButton}>
                    <Text style={styles.textButton}>Editar Perfil</Text>
                </TouchableHighlight>
                <UserEditModal navigation={navigation} user={userInfo} setRefreshInfo={setRefreshInfo} setShowModal={setShowModal} showModal={showModal} />
            </View>
            <View>
                <Text style={styles.publications}>Lista de Publicaciones</Text>
                <PublicationList user={userInfo}/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: COLORS.blue_dark_one,
        height: '100%',
    },
    name: {
        color: COLORS.grey,
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },
    editButton: {
        position: 'absolute',
        marginLeft: 90,
        right: 25,
        top: -55,
        width: 150,
        height: 35,
        backgroundColor: COLORS.primary,
        borderRadius: 50
    },
    textButton: {
        textAlign: 'center',
        fontSize: 15,
        color: COLORS.white,
        marginTop: 5,
    },
    publications: {
        color:COLORS.white,
        fontSize: 25,
        textAlign: 'center',
    },
});
