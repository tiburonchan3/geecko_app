import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import Login from '../components/Login';
import {COLORS} from '../colors/colors';
import geecko from '../assets/geckoo.png';

export default function LoginRegister(props) {
    const {setRefreshLogin} = props;
  return (
    <View style={styles.body}>
        <Image style={styles.image} source={geecko}/>
        <Login setRefreshLogin={setRefreshLogin}/>
     </View>
  );
}
const styles = StyleSheet.create({
    body : {
        backgroundColor: COLORS.blue_dark_one,
        width: '100%',
        height: '100%'
    },
    image: {
        width: 200,
        height: 200,
        position: 'absolute',
        top: '5%',
        left: '20%'
    }
})
