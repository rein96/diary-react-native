
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import ignoreWarnings from 'react-native-ignore-warnings'

// ignore warning when add diary to database
ignoreWarnings('Setting a timer')
ignoreWarnings('Warning: componentWillUpdate is deprecated')
ignoreWarnings('Warning: componentWillReceiveProps is deprecated')

AppRegistry.registerComponent(appName, () => App);
