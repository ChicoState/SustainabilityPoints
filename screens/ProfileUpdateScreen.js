import React from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateDisplayName, updateOrgName, updateProfile, getUser } from '../actions/user'
import { Colors, Spacing, Typography } from '../styles'

class ProfileUpdateScreen extends React.Component {
	componentDidMount = () => {
		this.props.updateDisplayName( this.props.user.displayName )
		this.props.updateOrgName( this.props.user.org_name )
	  };

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.headerContent}>
					<Image style={styles.avatar}
						source={{uri: 'https://i.kym-cdn.com/entries/icons/original/000/020/260/nilesyy-nilez.jpg'}}/>

						{this.props.user.displayName ? <Text style={styles.name}> {this.props.user.displayName} </Text> : <Text style={styles.name}> {this.props.user.email} </Text> }
						{this.props.user.org_name ? <Text style={styles.userInfo}> {this.props.user.org_name} </Text> : <Text style={styles.name}>  </Text> }
						<Text style={styles.userInfo}>Sustainability Points: {this.props.user.points_current} </Text>
					</View>
				</View>
				
				<TextInput
				placeholder="Display Name"
				placeholderTextColor="#4D786E"
				style={styles.textbox}
				autoCapitalize="none"
				defaultValue={this.props.user.displayName}
				onChangeText={displayname => this.props.updateDisplayName( displayname )}
			  />
  
			  <TextInput
				placeholder="Organization"
				placeholderTextColor="#4D786E"
				style={styles.textbox}
				autoCapitalize="none"
				defaultValue={this.props.user.org_name}
				onChangeText={orgname => this.props.updateOrgName( orgname )}
			  />
				<Button title='UpdateProfile' onPress={() => this.UpdateProfile()} />
				<Button title='Cancel' onPress={() => this.Cancel()} />
			</View>
		)
	}
	UpdateProfile() {
		this.props.updateProfile();
		const { navigation } = this.props;
		navigation.navigate("Profile");
	}
	Cancel() {
		this.props.getUser(this.props.user.uid);
		const { navigation } = this.props;
		navigation.navigate("Profile");
	}
}

const styles = StyleSheet.create({
	header:{
		backgroundColor: "#00B09B",
	},
	settings: {
		
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
	},
	textbox: {
		borderRadius: 5,
		borderWidth: 1,
		...Colors.textbox,
		...Spacing.textbox
	}
})

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateDisplayName, updateOrgName, updateProfile, getUser }, dispatch)
  }
  
  const mapStateToProps = state => {
	  return {
		  user: state.user
	  }
  }
  
  export default connect(
	  mapStateToProps,
	  mapDispatchToProps
  )(ProfileUpdateScreen)
