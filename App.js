import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, YellowBox } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LoginActivity from './components/LoginActivity';
import SignUpActivity from './components/SignUpActivity';

const RootStack = createStackNavigator(
{
Login: { screen: LoginActivity },
SignUp: { screen: SignUpActivity },
},
{
initialRouteName: 'Login',
}
);
export default class App extends Component {
render() {
return <RootStack />;
}
}