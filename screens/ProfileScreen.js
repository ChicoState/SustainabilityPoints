import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'
import Firebase from '../apis/Firebase'


class ProfileScreen extends React.Component {
	handleSignout = () => {
		Firebase.auth().signOut()
		this.props.navigation.navigate('Login')
	}

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
				<Button title='Logout' onPress={this.handleSignout} />
			</View>
		)
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
