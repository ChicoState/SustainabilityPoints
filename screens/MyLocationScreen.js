import React, {useState} from 'react';
import {Pedometer} from 'expo-sensors';
import * as Location from 'expo-location';
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
	
	  componentDidMount() {
		  //console.log("yeah");
		
		//  console.log("bye"+this.watchID);
		this._getLocationAsync();

		this.watchID = navigator.geolocation.watchPosition(
			  
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
				 distanceTravelled:
				 distanceTravelled + this.calcDistance(newCoordinate),
				 speed: position.coords.speed,
				 prevLatLng: newCoordinate
			   });

			 },
			 error => console.log(error),
			 { enableHighAccuracy: false, timeout: 200, maximumAge: 100 }
		  );

		 
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
	 
	   console.log("chii");
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
		return haversine(prevLatLng, newLatLng) || 0;
	  };
	
	 
	
		
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
export default MyLocationScreen;
