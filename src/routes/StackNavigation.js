import React from 'react'
import Home from '../screens/Home';
import Account from '../screens/Account';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import { COLORS } from '../colors/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
export default function StackNavigation({navigation}) {
    const IconButton = () => {
        return (
            <Icon style={{marginLeft:15}} color={COLORS.white} name="bars" size={25} onPress={()=>navigation.openDrawer()}/>
        )
    }
  return (
   <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={Home}
            options={
                {
                    title:"Inicio",
                    headerLeft: () => <IconButton/>,
                    headerStyle: {
                        backgroundColor: COLORS.blue_dark_two,
                    },
                    headerTintColor: COLORS.white,
                    headerTitleAlign:"center"
                }
            }
        />
        <Stack.Screen
            name="Account"
            component={Account}
            options={
                {
                    title:"Cuenta",
                    headerLeft: () => <IconButton/>,
                    headerStyle: {
                        backgroundColor: COLORS.blue_dark_two,
                    },
                    headerTintColor: COLORS.white,
                    headerTitleAlign:"center"
                }
            }
        />
   </Stack.Navigator>
  );
}
