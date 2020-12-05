import React from 'react';
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native';
import { COLORS } from '../colors/colors';

export default function Splash() {
  return (
    <View style={styles.splash}>
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text>Cargando...</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    splash: {
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.white,
        position: "absolute",
      },
      loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
})
