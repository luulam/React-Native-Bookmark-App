import React from 'react'
import { Platform } from 'react-native'
import { StackNavigator } from 'react-navigation';

//all screen
import Splash from '../screens/splash'
import Home from '../screens/home'
import AddBookmark from '../screens/addBookmark'


export default Navigation = StackNavigator(
    {
        Home: {
            screen: Home
        },
        Splash: {
            screen: Splash
        },
        AddBookmark: {
            screen: AddBookmark
        }
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        cardStyle: {
            shadowColor: 'transparent',
            backgroundColor: 'transparent'
        },
        
    }
)