import React,{useState,useEffect} from 'react';
import { createDrawerNavigator,DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './StackNavigation';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

export default function Navigation(props) {
    const {setRefreshLogin} = props
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerContent={(props)=> <DrawerContent props={props} setRefreshLogin={setRefreshLogin}/>}>
        <Drawer.Screen setRefreshLogin={setRefreshLogin} name="app" component={StackNavigation}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
