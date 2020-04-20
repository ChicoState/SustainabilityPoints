import React, {useState} from 'react';
import {Pedometer} from 'expo-sensors';
import * as Location from 'expo-location';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../actions/user'
import Firebase, { db }from '../apis/Firebase'
import * as Permissions from 'expo-permissions';
import MapView, {
	Marker,
	AnimatedRegion,
	Polyline,
	PROVIDER_GOOGLE
  } from "react-native-maps";  import { DeviceMotion } from 'expo-sensors';
import { Alert, LinearGradient, Image, TouchableOpacity, TextInput, Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import { CustomButton } from '../components/CustomButton.js'
import * as Font from 'expo-font'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import haversine from "haversine";



//var Pedometer = require('react-native-pedometer');
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
var geoLoc;
var watchID;

class MyLocationScreen extends React.Component {
	state = {
		mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
		locationResult: null,
		routeCoordinates: [],
	distanceTravelled: 0,
	speed: 0,
    prevLatLng: {},
		location: {coords: { latitude: 37.78825, longitude: -122.4324}},
		coordinate: new AnimatedRegion({
			latitude: LATITUDE,
			longitude: LONGITUDE
		   })
	  };
	
	 async componentDidMount() {
		  //console.log("yeah");
		
		//  console.log("bye"+this.watchID);
		this._getLocationAsync();

		let current_points;
		let last_loggedin;
		let daily_distance;
		this.currentUser = await  Firebase.auth().currentUser;
/*
		if(navigator.geolocation){
			geoLoc = navigator.geolocation;
		watchID = geoLoc.watchPosition(
			  
			position => {
			  const { coordinate, routeCoordinates, distanceTravelled } =   this.state;
			  const { latitude, longitude } = position.coords;
			 // console.log("latitude2-"+latitude);
			  const newCoordinate = {
				latitude,
				longitude
			  };
			  if (Platform.OS === "android") {
				if (this.marker) {
				  this.marker._component.animateMarkerToCoordinate(
					newCoordinate,
					500
				  );
				 }
			   } else {
				 coordinate.timing(newCoordinate).start();
			   }
			   this.setState({
				 latitude,
				 longitude,
				 routeCoordinates: routeCoordinates.concat([newCoordinate]),
				 distanceTravelled: distanceTravelled +  this.calcDistance(newCoordinate),
				 speed: position.coords.speed,
				 prevLatLng: newCoordinate
			   });

			 },
			 error => console.log(error),
			 { enableHighAccuracy: false, timeout: 200, maximumAge: 100 }
		  );
			}

		 */
	  }
	  
	  _handleMapRegionChange = mapRegion => {
		  console.log("yeah");
		this.setState({ mapRegion });
	  };
	
	  _getLocationAsync = async () => {
				
		
	   let { status } = await Permissions.askAsync(Permissions.LOCATION);
	   if (status !== 'granted') {
		 this.setState({
		   locationResult: 'Permission to access location was denied',
		   location,
		 });
		 console.log('Starting watchPositionAsync')
		 this.watchId = Location.watchPositionAsync({
		   enableHighAccuracy: false,
		   distanceInterval: 2000,
		   timeInterval: 200000
		 }, newLoc => {
		   if(newLoc.timestamp && !!this.props.currentRecords) {
			 console.log('newLoc ', counter)
			 this.updateLoc(newLoc)
			 counter++
		   } else {
			 console.log('ignored newLoc')
		   }
		 })
	   }
	   else{

	   }
	 
	   console.log("checks_check");
	   //alert("chi");
	   let location = await Location.getCurrentPositionAsync({});
	   //alert(location.coords.latitude);
	   console.log("locationResult_ latitude-"+location.coords.latitude);
	   console.log("locationResult_longitude-"+location.coords.longitude);
	   this.setState({ locationResult: JSON.stringify(location), location, });
	 };
	
	

	 calcDistance = newLatLng => {
		const { prevLatLng } = this.state;
		console.log("latitude3-"+newLatLng.latitude);
		console.log("latitude4-"+prevLatLng.latitude);
		console.log("distance-"+haversine(prevLatLng, newLatLng));
		console.log("speed-"+this.state.speed);
		let today = new Date();
		//let last_logged_in_date = new Date(last_loggedin);
		//console.log("todayys-"+Firebase.firestore.Timestamp.fromDate(new Date()));
		console.log("uid-"+this.props.user.uid);

		
			current_points = this.props.user.points_current;
			last_loggedin = this.props.user.last_logged_in;
			daily_distance = this.props.user.distance_today;
		
			console.log("current_points-"+current_points);
		console.log("todaycheck-"+last_loggedin);
		//this.props.getUser(this.props.user.uid)
		//console.log("updated_distance"+this.props.user.distance_today );
			console.log("daily_distance2-"+daily_distance);
		
			if(this.state.speed<15 && haversine(prevLatLng, newLatLng) > 0){
	/*
				db.collection("users").doc(this.props.user.uid).set({
					points_current: current_points+haversine(prevLatLng, newLatLng),
					points_lifetime: current_points+haversine(prevLatLng, newLatLng) ,
					displayName: this.currentUser.providerData[0].displayName,
					email: this.currentUser.providerData[0].email,
					distance_today: todays_date == last_loggedin ? daily_distance+haversine(prevLatLng, newLatLng) : haversine(prevLatLng, newLatLng),
					last_logged_in : new Date().getMonth()+"/"+new Date().getDate()+"/"+new Date().getYear(),
					uid: this.currentUser.uid
		
			
				})
				.then(function() {
					console.log("Document successfully written!");
				})
				.catch(function(error) {
					console.error("Error writing document: ", error);
				})
				*/
			}
		
		return haversine(prevLatLng, newLatLng) || 0;
	  };
	
	 
	  start_tracking = () => {
		if(navigator.geolocation){
			geoLoc = navigator.geolocation;
		watchID = geoLoc.watchPosition(
			  
			position => {
			  const { coordinate, routeCoordinates, distanceTravelled } =   this.state;
			  const { latitude, longitude } = position.coords;
			 console.log("latitude5	-"+latitude);
			  const newCoordinate = {
				latitude,
				longitude
			  };
			  if (Platform.OS === "android") {
				if (this.marker) {
				  this.marker._component.animateMarkerToCoordinate(
					newCoordinate,
					500
				  );
				 }
			   } else {
				 coordinate.timing(newCoordinate).start();
			   }
			   this.setState({
				latitude,
				longitude,
				routeCoordinates: routeCoordinates.concat([newCoordinate]),
				distanceTravelled: distanceTravelled +  this.calcDistance(newCoordinate),
				speed: position.coords.speed,
				//prevLatLng: position.coords
			   prevLatLng: newCoordinate
			   });
			/*   this.setState({
				 latitude,
				 longitude,
				 routeCoordinates: routeCoordinates.concat([newCoordinate]),
				 distanceTravelled: distanceTravelled +  this.calcDistance(newCoordinate),
				 speed: position.coords.speed,
				 prevLatLng: newCoordinate
			   });
*/
			 },
			 error => console.log(error),
			 { enableHighAccuracy: false, timeout: 200, maximumAge: 100 }
		  );
			}
	  }
		
	  stop_tracking = () => {
		//navigator.geolocation.clearWatch(this.watchId);
		geoLoc.clearWatch(watchID);
		 //this.start_tracking.remove();
		//this.start_tracking = null;
		console.log("stop tracking");

	}

	test_start_tracking = () => {


	}


	test_stop_tracking = () => {


	}

	render() {
	
		return (
			<View style={styles.container}>
			 
			 <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        >
			<Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
  <MapView.Marker
    coordinate={{ "latitude": this.state.location.coords.latitude,   
    "longitude": this.state.location.coords.longitude }}
    title={"Your Location"}
    draggable />
	
        </MapView>
			
		<Text style={styles.bottomBarContent}>
      Distance traveled: {parseFloat(this.state.distanceTravelled).toFixed(2)} km
    </Text>
	<Text style={styles.bottomBarContent}>
     Speed: {parseFloat(this.state.speed).toFixed(2)} km/hr
    </Text>
	
	<CustomButton
			style={{marginBottom: 10}}
			title='Start Tracking'  onPress={this.start_tracking}  />
			<CustomButton
			style={{marginBottom: 10}}
			title='Stop Tracking' onPress={this.stop_tracking}   />
			
			  <View style={styles.buttonContainer}>
  <TouchableOpacity style={[styles.bubble, styles.button]}>
   
  </TouchableOpacity>
</View>
			  <Text>

</Text>
			</View>
		  );
};
}
/*
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
	, map: {
		...StyleSheet.absoluteFillObject,
	  }
});*/
const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		textAlign: 'center',
	  },
	mapStyle: {
	  width: Dimensions.get('window').width,
	  height: Dimensions.get('window').height/2,
	},
  });

  const mapDispatchToProps = dispatch => {
	return bindActionCreators({ getUser}, dispatch)
  }
  
  const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MyLocationScreen)

