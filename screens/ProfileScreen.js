import React, {useState} from 'react';
import { Alert, LinearGradient, Image, TouchableOpacity, TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { CustomButton } from '../components/CustomButton.js'
import * as Font from 'expo-font'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function ProfileScreen ({navigation}) {

	return (
		<View style={styles.container}>
		<View style={styles.header}>
		<View style={styles.headerContent}>
		<Image style={styles.avatar}
		source={{uri: 'https://i.kym-cdn.com/entries/icons/original/000/020/260/nilesyy-nilez.jpg'}}/>

		<Text style={styles.name}>Anthony </Text>
		<Text style={styles.userInfo}>California State University, Chico </Text>
		<Text style={styles.userInfo}>Sustainability Points: 28 </Text>
		</View>
		</View>

		</View>
	);
}

const styles = StyleSheet.create({
	header:{
		backgroundColor: "#00B09B",
	},
	headerContent:{
		padding:30,
		alignItems: 'center',
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: "white",
		marginBottom:10,
	},
	name:{
		fontSize:22,
		color:"#000000",
		fontWeight:'600',
	},
	userInfo:{
		fontSize:16,
		color:"#000000",
		fontWeight:'600',
	}
});

export default ProfileScreen;
