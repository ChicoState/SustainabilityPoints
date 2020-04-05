import React, {useState} from 'react';
import {Pedometer} from 'expo-sensors';
import { Location } from 'expo-location';
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
	constructor(props) {
		const { navigation } = props;
		super(props);
	
		this.state = {
		  latitude: LATITUDE,
		  longitude: LONGITUDE,
		  routeCoordinates: [],
		  distanceTravelled: 0,
		  prevLatLng: {},
		  coordinate: new AnimatedRegion({
			latitude: LATITUDE,
			longitude: LONGITUDE,
			latitudeDelta: 0,
			longitudeDelta: 0
		  })
		};
		//alert("sdsws");
		//this.getLocationAsync();
	  }



	state = {
		isPedometerAvailable: "checking",
		location: null,
		pastStepCount: 0,
		currentStepCount: 0
	  };
	
	  
	  componentDidMount() {
		this._subscribe();
		
		const { coordinate } = this.state;
	
		this.watchID = navigator.geolocation.watchPosition(
		  position => {
			  console.log("samsung");
			const { routeCoordinates, distanceTravelled } = this.state;
			const { latitude, longitude } = position.coords;
	
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
			  prevLatLng: newCoordinate
			});
		  },
		  error => console.log("error-"+error.message),
		  {
			enableHighAccuracy: true,
			timeout: 20000,
			maximumAge: 1000,
			distanceFilter: 10
		  }
		);
	  }
	
	  getLocationAsync = async () => {
		alert("ssdsg");
		const { status } = await Permissions.askAsync(Permissions.LOCATION);
	 alert('status'+status);
		if (status !== 'granted') {
			alert("no");
		  this.setState({
			errorMessage: 'Permission to access location was denied',
		  });
		  return;
		}
		else{
			alert("yes");
		}
	 
		const location = await Location.getCurrentPositionAsync({});
		this.setState({ location });
	  };
	
	  componentWillUnmount() {
		this._unsubscribe();
		navigator.geolocation.clearWatch(this.watchID);
	  }

	  getMapRegion = () => ({
		latitude: this.state.latitude,
		longitude: this.state.longitude,
		latitudeDelta: LATITUDE_DELTA,
		longitudeDelta: LONGITUDE_DELTA
	  });
	
	  calcDistance = newLatLng => {
		  console.log("yeah");
		const { prevLatLng } = this.state;
		console.log(haversine(prevLatLng, newLatLng));
		return haversine(prevLatLng, newLatLng) || 0;
	  };
	  _subscribe = () => {
		this._subscription = Pedometer.watchStepCount(result => {
		  this.setState({
			currentStepCount: result.steps
		  });
		});
	
		Pedometer.isAvailableAsync().then(
		  result => {
			this.setState({
			  isPedometerAvailable: String(result)
			});
		  },
		  error => {
			this.setState({
			  isPedometerAvailable: "Could not get isPedometerAvailable: " + error
			});
		  }
		);
	
		const end = new Date();
		const start = new Date();
		start.setDate(end.getDate() - 1);
		Pedometer.getStepCountAsync(start, end).then(
		  result => {
			this.setState({ pastStepCount: result.steps });
		  },
		  error => {
			this.setState({
			  pastStepCount: "Could not get stepCount: " + error
			});
		  }
		);
	  };
	  _unsubscribe = () => {
		this._subscription && this._subscription.remove();
		this._subscription = null;
	  };
		
	render() {
	return (
		<View style={styles.container}>
		<View style={styles.header}>
		<View style={styles.headerContent}>
		<Image style={styles.avatar}
		source={{uri: 'https://i.kym-cdn.com/entries/icons/original/000/020/260/nilesyy-nilez.jpg'}}/>

		
  
	<MapView
  style={styles.mapStyle}
  showUserLocation
  followUserLocation
  loadingEnabled
  region={this.getMapRegion()}
>
  <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
  <Marker.Animated
    ref={marker => {
      this.marker = marker;
    }}
    coordinate={this.state.coordinate}
  />
</MapView>
		<Text style={styles.name}>Anthony </Text>
		<Text style={styles.userInfo}>California Stat University, Chico </Text>
		<Text style={styles.userInfo}>Sustainability Points: 28 </Text>
		<Text>
          Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}
        </Text>
        <Text>
          Steps taken in the last 24 hours: {this.state.pastStepCount}
        </Text>
        <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text>
      </View>
	  <View style={styles.buttonContainer}>
  <TouchableOpacity style={[styles.bubble, styles.button]}>
    <Text style={styles.bottomBarContent}>
      {parseFloat(this.state.distanceTravelled).toFixed(2)} km
    </Text>
  </TouchableOpacity>
</View>
		</View>
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
	mapStyle: {
	  width: Dimensions.get('window').width,
	  height: Dimensions.get('window').height/2,
	},
  });
export default MyLocationScreen;
