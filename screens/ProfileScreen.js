import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'
import Firebase from '../apis/Firebase'


class ProfileScreen extends React.Component {
	handleSignout = () => {
		Firebase.auth().signOut()
		this.props.navigation.navigate('Login')
	}
	registerForPushNotificationsAsync = async () => {

	  const { status } = await Permissions.askAsync
	(Permissions.NOTIFICATIONS);

	  // only asks if permissions have not already been determined, because
	  // iOS won't necessarily prompt the user a second time.
	  // On Android, permissions are granted on app installation, so
	  // `askAsync` will never prompt the user

	  // Stop here if the user did not grant permissions
	  if (status !== 'granted') {
	console.log('Enable permissions')
	    alert('Enable permissions in settings!');
	    return;
	  }

	try{
	  // Get the token that identifies this device
	  let token = await Notifications.getExpoPushTokenAsync();
	console.log('TOKEN', token)
	console.log('USER', db.collection('users'))

	console.log(this.currentUser)
	 db
	 .collection('users')
	 .doc(this.props.user.uid)
	 .update({
	 'pushToken': token,
	 })
	 }
	 catch(error){
	 console.log(error);
	 }
	};
	async componentDidMount(){
	this.currentUser = await Firebase.auth().currentUser
	await this.registerForPushNotificationsAsync();
	}
	sendPushNotification = () => {
	let response = fetch('https://exp.host/--/api/v2/push/send',{
	method: 'POST',
	headers: {
	Accept: 'application/json',
	'Content-Type': 'application/json'
	},
	body:JSON.stringify({
	to:this.props.users.pushToken,
	sound:'default',
	title:'Demo',
	body:'Demo notification'
	})

	})
	};
	render() {
		return (
			<View style={styles.container}>
			<View style={styles.header}>
			<View style={styles.headerContent}>
			<Image style={styles.avatar}
			source={{uri: 'https://i.kym-cdn.com/entries/icons/original/000/020/260/nilesyy-nilez.jpg'}}/>

			<Text style={styles.name}>Anthony </Text>
			<Text style={styles.userInfo}>California State University, Chico </Text>
			<Text style={styles.userInfo}>Sustainability Points: {this.props.user.points_current} </Text>
			</View>
			</View>
			<Button title='MyLocation' onPress={() => this.MyLocationFunc()} />
				<Button title='Logout' onPress={this.handleSignout} />
			</View>
		)
		}

		MyLocationFunc() {
			const { navigation } = this.props;
			navigation.navigate("MyLocation");
		  }
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
})

const mapStateToProps = state => {
	return {
		user: state.user
	}
}




export default connect(mapStateToProps)(ProfileScreen)
