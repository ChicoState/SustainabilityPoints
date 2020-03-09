import React, {useState} from 'react';
import { Alert, LinearGradient, Image, TouchableOpacity, TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { CustomButton } from './components/CustomButton.js'
import SignUpScreen from './screens/SignUpScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import * as Font from 'expo-font'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {

	return (

		<NavigationContainer>
      		<Stack.Navigator initialRouteName = "Login">
        		<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Profile" component={ProfileScreen} />
				<Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      		</Stack.Navigator>
    	</NavigationContainer>

	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#00B09B',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		display: 'flex',
		height: 50,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',

		backgroundColor: '#2AC062',
		shadowColor: '#2AC062',
		shadowOpacity: 0.4,
		shadowOffset: { height: 10, width: 0 },
		shadowRadius: 20,
	},
	text: {
		fontSize: 16,
		textTransform: 'uppercase',
		color: '#FFFFFF',
		alignItems: 'center',
		marginBottom: "8%",
		alignItems: 'center',
	},
	titleText: {
		fontSize: 40,

		textAlign: 'center',
		fontWeight: 'bold',
		alignItems: 'center',
		justifyContent: 'center',
		color: '#2BB700',
		marginBottom: "8%"
	},
});

export default App;
