import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'  // support ionicons.com
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'

import AuthScreen from './src/auth/AuthScreen'

import EmployeeScreen from './src/appEmployee/EmployeeScreen'
import AddEmployeeScreen from './src/appEmployee/AddEmployeeScreen'
import DetailEmployeeScreen from './src/appEmployee/DetailEmployeeScreen'

import DiaryScreen from './src/app/DiaryScreen'
import AddDiaryScreen from './src/app/AddDiaryScreen'
import DetailDiaryScreen from './src/app/DetailDiaryScreen'

import ProfileScreen from './src/app/ProfileScreen'

import STORE from './src/store/reducers/index'

/* 
    ini props.navigation (DiaryScreen.js) bisa dipake karena di App.js const DiaryStack = creteStackNavigator({})
    this.props.navigation.navigate('AddDiary')
*/

const EmployeeStack = createStackNavigator(
    {
      ListEmployee: EmployeeScreen,
      AddEmployee: AddEmployeeScreen,
      DetailEmployee: DetailEmployeeScreen,
    },
    {
      headerMode: 'none'
    }
);

const DiaryStack = createStackNavigator(
    {
      ListDiary: DiaryScreen,
      AddDiary: AddDiaryScreen,
      DetailDiary: DetailDiaryScreen
    },
    {
      headerMode: 'none'
    }
);

// createBottomTabNavigator(RouteConfigs, BottomTabNavigatorConfig);
const MainTab = createBottomTabNavigator(
    // RouteConfigs
    {
        // 'Nama' Tab nya
        Employee: {
            screen: EmployeeStack,     // 3 stack screen
            navigationOptions: {
                tabBarIcon: <Icon name='contacts' />   //<ion-icon name="contacts"></ion-icon>
            }
        },
        Diary : {
            screen: DiaryStack,
            navigationOptions: {
                tabBarIcon: <Icon name='bookmarks' />
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
);


const RootStack = createStackNavigator({
    // properties order by first stack
    Auth: AuthScreen,
    Kesini: EmployeeScreen,
    Main: MainTab
}, {
    // Remove the grey header for all screens
    headerMode: 'none'
});


const AppContainer = createAppContainer(RootStack);


class App extends Component {
  
  render() {
    return (
        <Provider store={STORE} >
            <AppContainer  />
        </Provider>
        
    )
  }
};

export default App
