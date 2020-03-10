import React, {useState} from 'react';
import { Alert, LinearGradient, Image, TouchableOpacity, TextInput, Button, StyleSheet, Text, View } from 'react-native';
import logo from '../assets/SPplaceholder-02.png';
import { CustomButton } from '../components/CustomButton.js'
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import Firebase from './../apis/Firebase'

Firebase.auth().onAuthStateChanged((user) => {
	if (user != null) {
	  console.log("we are authenticated now!");
	}
  });

class SignUpScreen extends React.Component {
	constructor(props) {
		super(props);
	  	this.state = {
			email: "",
			password: ""
	  	};
	}
	SignUp = (email, password) => {
		try {
			Firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then(user => { 
				   console.log(user);
			 	});
  		} catch (error) {
			console.log(error.toString(error));
		}
	}

	render() {
		return ( 
			<View style={{padding: 50, backgroundColor: '#FFFFFF'}}>
				<View>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Image source={logo} style={{marginBottom: "2%"}} />
					</View>

					<Text style={styles.titleText}>Sustainability Point</Text>
					<TextInput  placeholder="Username" placeholderTextColor = "#4D786E"	style={styles.textbox}/>
					<TextInput  placeholder="Email"	placeholderTextColor = "#4D786E" style={styles.textbox} 
						onChangeText={email => this.setState({ email })}/>
					<TextInput placeholder="Password" placeholderTextColor = "#4D786E" style={styles.textbox}
						onChangeText={password => this.setState({ password })}/>
					<CustomButton title="SignUp" onPress={ () => this.SignUp(this.state.email, this.state.password) }
						style={{backgroundColor: "#00B78D", }} 	textStyle={{ color:"#FFF" }}/>

					<View style={{padding:30}}>
						<Button title="Login" color="#00B78D"/>
					</View>

					<Button color="#B7002A" title="Forgot Password?"/>
				</View>
			</View>
		);
	const { navigation } = this.props;
	}
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 0,
		alignItems: 'center',
	},
	textbox: {
		backgroundColor: 'rgba(247,247,247,0.6)', 
		borderRadius: 5, 
		borderColor: '#00B78D',
		borderWidth: 1,
		padding:10,
		marginBottom: "8%", 
		height:50,
	}
});

export default function(props) {
	const navigation = useNavigation();
	return <SignUpScreen {...props} navigation ={navigation} />
}

