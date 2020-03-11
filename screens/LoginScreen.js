import React, {useState} from 'react';
import { Alert, LinearGradient, Image, TouchableOpacity, TextInput, Button, StyleSheet, Text, View } from 'react-native';
import logo from '../assets/SPplaceholder-02.png';
import { CustomButton } from '../components/CustomButton.js'
import ProfileScreen from './ProfileScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Firebase from './../apis/Firebase'

Firebase.auth().onAuthStateChanged((user) => {
	if (user != null) {
	  console.log("we are authenticated now!");
	}
  });

class LoginScreen extends React.Component {
	constructor(props) {
		super(props);
	  	this.state = {
			email: "",
			password: ""
	  	};
	}
	Login = (email, password) => {
		try {
			Firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then(res => { 
				   console.log(res.user.email);
			 	});
  		} catch (error) {
			console.log(error.toString(error));
		}
	}
	
	render() {
		return (
			<View style={{padding: 50, backgroundColor: '#FFFFFF'}}>
				<View>
					<View style={{ justifyContent: 'center', alignItems: 'center',}}>
						<Image source={logo} style={{marginBottom: "2%"}} />
					</View>

					<Text style={styles.titleText}>Sustainability Points</Text>
					<TextInput  placeholder="Username" placeholderTextColor = "#4D786E" style={styles.textbox}/>
					<TextInput  placeholder="Email"	placeholderTextColor = "#4D786E" style={styles.textbox} 
						onChangeText={email => this.setState({ email })}/>
					<TextInput placeholder="Password" placeholderTextColor = "#4D786E" style={styles.textbox}
						onChangeText={password => this.setState({ password })}/>
					<CustomButton title="Login" onPress={ () => this.Login(this.state.email, this.state.password) }
						style={{backgroundColor: "#00B78D", }} 	textStyle={{ color:"#FFF" }}/>
					<View style={{padding:30}}>
						<Button title="Sign Up" color="#00B78D"	onPress={() => navigation.navigate('SignUpScreen')  }/>
					</View>
					<Button color="#B7002A" title="Forgot Password?"/>
				</View>
			</View>
		);
	const { navigation } = this.props;
	}
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
	textbox: {
		backgroundColor: 'rgba(247,247,247,0.6)', 
		borderRadius: 5, 
		borderColor: '#00B78D',
		borderWidth: 1,
		padding:10,
		marginBottom: "8%", 
		height:50,
	},
});

export default function(props) {
	const navigation = useNavigation();
	return <LoginScreen {...props} navigation = {navigation} />
}
