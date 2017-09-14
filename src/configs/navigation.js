import React from 'react'
import { Platform } from 'react-native'
import { StackNavigator } from 'react-navigation';

//all screen
import Splash from '../screens/splash'
import Home from '../screens/home'
import AddBookmark from '../screens/addBookmark'
import AllTags from '../screens/allTags'
import Bookmarks from '../screens/bookmarks'
import Search from '../screens/search'
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
        },
        AllTags: {
            screen: AllTags
        },
        Bookmarks: {
            screen: Bookmarks
        },
        Search: {
            screen: Search
        }
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        cardStyle: {
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 0,
            shadowOpacity: 0,
            shadowColor: '#000000',
            elevation: 2,

            backgroundColor: 'transparent',
        },

    }
)