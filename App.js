import React, { useState, useEffect } from "react";
import 'react-native-gesture-handler';
import { StyleSheet, StatusBar,LogBox } from "react-native";
import LoginRegister from "./src/screens/LoginRegister";
import Navigation from './src/routes/Navigation';
import * as Auth from './src/api/auth';
import {COLORS} from './src/colors/colors';
import {authContext} from './src/utils/context';

export default function App() {
  const [user, setUser] = useState(undefined);
  const [refreshLogin, setRefreshLogin] = useState(false);
  const [loadUser, setLoadUser] = useState(false)
  const setUserLog = async () =>{
    setUser(await Auth.isUserLoggedApi());
  }
  useEffect(() => {
    setUserLog()
    setLoadUser(true)
    setRefreshLogin(false)
  }, [refreshLogin])
  LogBox.ignoreAllLogs();
  if(!loadUser) return null
  return (
    <authContext.Provider value={user}>
    <StatusBar barStyle="light-content" hidden={false} backgroundColor={COLORS.blue_dark_two} translucent={true}/>
      {user ? (
        <Navigation setRefreshLogin={setRefreshLogin}/>
      ) : (
        <LoginRegister setRefreshLogin={setRefreshLogin} />
      )}
    </authContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
