import React, {useState} from 'react';
import {Pedometer} from 'expo-sensors';
import * as Location from 'expo-location';
import {SafeAreaView } from 'react-native';
import { connect } from 'react-redux'
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
import axios from 'axios'

const YELP_API_KEY = 'ixfBlOCtW64efWOJ_zjjh8oMU5swIAmjrxq_eYHWYsttwiJXEaYkPRBGwzbafcehGRdZ2fq8_PdCtE8Va5FEg_dVaPl6mUjhWyJaYh1usD8uSoQWrjWXL_2yiIqcXnYx';




//var Pedometer = require('react-native-pedometer');
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

const api = axios.create({
	baseURL: 'https://api.yelp.com/v3',
	headers: {
	  Authorization: `Bearer ${YELP_API_KEY}`,
	},
  })

  const deltas = {
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421
  };

  const region = {
	latitude: 37.321996988,
	longitude: -122.0325472123455,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421
  }

  
  
  const getCoffeeShops = userLocation => {
	console.log("reached3");
	return api
	  .get('/businesses/search', {
		params: {
		  limit: 10,
		  categories: 'coffee,coffeeroasteries,coffeeshops',
		  ...userLocation,
		},
	  })
	  .then(res =>
		res.data.businesses.map(business => {
		  return {
			name: business.name,
			coords: business.coordinates,
		  }
		})
	  )
	  .catch(error => console.error(error))
  }

class ShopScreen extends React.Component {
	state = {
		mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
		locationResult: null,
		routeCoordinates: [],
	distanceTravelled: 0,
	speed: 0,
	markers: [],
    prevLatLng: {},
		location: {coords: { latitude: 37.78825, longitude: -122.4324}},
		coordinate: new AnimatedRegion({
			latitude: LATITUDE,
			longitude: LONGITUDE
		   })
	  };
	
	  componentWillMount() {
	/*	const config = {
			headers: {'Authorization': `Bearer ${YELP_API_KEY}`},
			params: {
				latitude: this.state.location.coords.latitude, 
				longitude: this.state.location.coords.longitude, 
			}
		  };
		axios
		.get('https://api.yelp.com/v3/businesses/search', config)
		.then(responseJson => {
			console.log("reached-api7")
		  this.setState({
			  markers: responseJson.data.businesses.map(x => x),
			});
		})
		.catch(error => {
		  console.log(error);
		});
		*/
		}
	 async componentDidMount() {
		  //console.log("yeah");
	
		 
		//  console.log("bye"+this.watchID);
		this._getLocationAsync();
		// this.fetchMarkerData();

		let current_points;
		let last_loggedin;
		let daily_distance;
		this.currentUser = await  Firebase.auth().currentUser;

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
				 distanceTravelled +  this.calcDistance(newCoordinate),
				 speed: position.coords.speed,
				 prevLatLng: newCoordinate
			   });

			  console.log("cooo4");
			   const config = {
				 headers: {'Authorization': `Bearer ${YELP_API_KEY}`},
				 params: {
					 latitude: latitude, 
					 longitude: longitude, 
					 limit: 10,
				radius: 10000
				 }
			   };
			 return axios
			   .get('https://api.yelp.com/v3/businesses/search', config)
			   //.then((res) => res.json())
			   //.then((data) => {
					 .then(responseJson => {
						responseJson.data.businesses.sort((a, b) => a.distance - b.distance);
				 this.setState({
					 markers: responseJson.data.businesses.map(x => x),
				   });

				  this.state.markers.sort(function(a,b) { return parseInt(a.distance)-parseInt(b.distance)});

				console.log("markers2");
			  console.log(this.state.markers);
			   })
			   .catch(error => {
				 console.log(error);
			   });
			 },
			 error => console.log(error),
			 { enableHighAccuracy: false, timeout: 200, maximumAge: 100 }
		  );
		 
	  }
	  
	 /* fetchMarkerData() {
		  console.log("yooo2");
		  const config = {
			headers: {'Authorization': `Bearer ${YELP_API_KEY}`},
			params: {
				latitude: this.state.location.coords.latitude, 
				longitude: this.state.location.coords.longitude, 
			}
		  };
		return axios
		  .get('https://api.yelp.com/v3/businesses/search', config)
		  .then(responseJson => {
			this.setState({
				markers: responseJson.data.businesses.map(x => x),
			  });
		  })
		  .catch(error => {
			console.log(error);
		  });
	  }*/
	  _handleMapRegionChange = mapRegion => {
		  console.log("yeah");
		this.setState({ mapRegion });
	  };
	
	  getCoffeeShops = async () => {
		  console.log("reached");
		const { latitude, longitude } = this.state.region;
		const userLocation = { latitude, longitude };
		const coffeeShops = await YelpService.getCoffeeShops(userLocation);
		console.log("coffeeShops"+coffeeShops);
		this.setState({ coffeeShops });
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
	 
	   console.log("chii3");
	   //this.getCoffeeShops();
	   //alert("chi");
	   let location = await Location.getCurrentPositionAsync({});
	   //alert(location.coords.latitude);
	   console.log("locationResult_ latitude-"+location.coords.latitude);
	   console.log("locationResult_longitude-"+location.coords.longitude);
	   this.setState({ locationResult: JSON.stringify(location), location, });

	  // console.log("yooo3");
		  const config2 = {
			headers: {'Authorization': `Bearer ${YELP_API_KEY}`},
			params: {
				latitude: location.coords.latitude, 
				longitude: location.coords.longitude, 
				limit: 10,
				radius: 10
			}
		  };
		return axios
		  .get('https://api.yelp.com/v3/businesses/search', config2)
		//.then((res) => res.json())
			   //.then((data) => {
				.then(responseJson => {
					responseJson.data.businesses.sort((a, b) => a.distance - b.distance);
			data.sort((a, b) => a.distance - b.distance);
			this.setState({
				markers: responseJson.data.businesses.map(x => x),
			  });
			  this.state.markers.sort(function(a,b) { return parseInt(a.distance)-parseInt(b.distance)});
			 console.log("markers1");
			  console.log(this.state.markers);
		  })
		  .catch(error => {
			console.log(error);
		  });

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
		let todays_date = new Date().getMonth()+"/"+new Date().getDate()+"/"+new Date().getYear();
		let distance_today_val = 0;
		if(todays_date == last_loggedin){
			console.log("its todayy");
		}
		else{
			console.log("its not today")
		}
		
		

		
	
		
		if(this.state.speed<15 && haversine(prevLatLng, newLatLng) > 0){
			
		db.collection("users").doc(this.currentUser.uid).set({
			points_current: current_points+haversine(prevLatLng, newLatLng),
			points_lifetime: current_points+haversine(prevLatLng, newLatLng) ,
			displayName: this.currentUser.providerData[0].displayName,
			email: this.currentUser.providerData[0].email,
			distance_today: today == last_logged_in_date ? daily_distance+haversine(prevLatLng, newLatLng) : haversine(prevLatLng, newLatLng),
			last_logged_in : new Date().getDate(),
			uid: this.currentUser.uid

	
		})
		.then(function() {
			console.log("Document successfully written!");
		})
		.catch(function(error) {
			console.error("Error writing document: ", error);
		})
	}
		
		return haversine(prevLatLng, newLatLng) || 0;
	  };
	
	 
	
		
	render() {
	
		return (
			<View style={styles.container}>
			 
			 <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
		  places={this.state.coffeeShops}
		>
			{this.state.markers.map(marker => (
    <MapView.Marker 
      coordinate={marker.coordinates}
      title={marker.title}
    />
	
  ))}
	 	
  <MapView.Marker
    coordinate={{ "latitude": this.state.location.coords.latitude,   
    "longitude": this.state.location.coords.longitude }}
    title={"Your Location"}
    draggable />
	
        </MapView>
<Text>Shops List:</Text>
		{this.state.markers.map(marker => (
    <Text>Name: {marker.name} , City: {marker.location.city} , State: {marker.location.state} , Street Address: {marker.location.address1} , ZipCode: {marker.location.zip_code} , Distance: {marker.distance} meters </Text>
	
  ))}
			
	
	
			
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
  const mapStateToProps = state => {
	return {
		user: state.user
	}
}
export default connect(mapStateToProps)(ShopScreen)

