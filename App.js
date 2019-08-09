import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'  // support ionicons.com
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'

import AuthScreen from './src/auth/AuthScreen'
import DiaryScreen from './src/app/DiaryScreen'
import ProfileScreen from './src/app/ProfileScreen'

// createBottomTabNavigator(RouteConfigs, BottomTabNavigatorConfig);
const MainTab = createBottomTabNavigator(
    // RouteConfigs
    {
        // 'Nama' Tab nya
        Diary: {
            screen: DiaryScreen,
            navigationOptions: {
                tabBarIcon: <Icon name='bookmarks' />   //<ion-icon name="bookmarks"></ion-icon>
            }
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: <Icon name="contact" /> // <ion-icon name="contact"></ion-icon>
            }
        }

    },
    // BottomTabNavigatorConfig
    {
        tabBarOptions: {
            activeTintColor: 'purple',
            inactiveTintColor : 'grey'
        }
    }
)

const RootStack = createStackNavigator({
    // properties order by first stack
    Auth: AuthScreen,
    Kesini: DiaryScreen,
    Main: MainTab
}, {
    // Remove the grey header for all screens
    headerMode: 'none'
})


const AppContainer = createAppContainer(RootStack)


class App extends Component {
  
  render() {
    return (
        <AppContainer  />
    )
  }
}

export default App
