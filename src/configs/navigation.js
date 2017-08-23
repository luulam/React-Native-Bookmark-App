import React from 'react'
import { Platform } from 'react-native'
import { StackNavigator } from 'react-navigation';

//all screen
import Splash from '../screens/splash'
import Home from '../screens/home'


export default Navigation = StackNavigator(
    {
        Home: {
            screen: Home
        },
        Splash: {
            screen: Splash
        }
    },
    {

    }
)