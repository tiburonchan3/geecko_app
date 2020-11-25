import React from 'react';
import { View, Text,Image , StyleSheet } from 'react-native';
import {API_HOST} from '../utils/constants';
import NotFound from '../assets/no-image.jpg';
import {COLORS} from '../colors/colors';

export default function BannerAvatar(props) {
    const {user} = props
    const bannerUrl ={uri: `${API_HOST}/mostrarBanner?id=${user?.id}`};
    const avatarUrl ={uri: `${API_HOST}/mostrarAvatr?id=${user?.id}`};
  return (
    <View>
        <Image style={styles.banner} source={user?.banner ? bannerUrl : NotFound}/>
        <Image style={styles.avatar} source={user?.avatar ? avatarUrl : NotFound}/>
     </View>
  );
}

const styles = StyleSheet.create({
    banner: {
        width: '100%',
        height: 200,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 90,
        position: 'absolute',
        bottom:-2,
        borderWidth:5,
        borderColor: COLORS.blue_dark_one,
    }
})
