import React from 'react';
import * as Location from 'expo-location';
import {Platform, ScrollView} from 'react-native';
import { connect } from 'react-redux'
import Firebase, { db }from '../apis/Firebase'
import * as Permissions from 'expo-permissions';
import MapView, {
	AnimatedRegion
  } from "react-native-maps"; 
import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from 'react-native';
import axios from 'axios'

const YELP_API_KEY = 'ixfBlOCtW64efWOJ_zjjh8oMU5swIAmjrxq_eYHWYsttwiJXEaYkPRBGwzbafcehGRdZ2fq8_PdCtE8Va5FEg_dVaPl6mUjhWyJaYh1usD8uSoQWrjWXL_2yiIqcXnYx';




//var Pedometer = require('react-native-pedometer');

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;


  





class ShopScreen extends React.Component {
	state = {
		mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
		locationResult: null,
		routeCoordinates: [],
	distanceTravelled: 0,
	speed: 0,
	current_zipcode: null,
	markers: [],
	busArr: [],
	markers2: [],
    prevLatLng: {},
		location: {coords: { latitude: 37.78825, longitude: -122.4324}},
		coordinate: new AnimatedRegion({
			latitude: LATITUDE,
			longitude: LONGITUDE
		})
	};

	
	async componentDidMount() {
		//console.log("yeah");
		const busArr = [];
		const names = [];
		db.collection("business").get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				// doc.data() is never undefined for query doc snapshots
				busArr.push({
					key: doc.id,
			city: doc.data().address.city,
			number: doc.data().address.number,
			state: doc.data().address.state,
			street: doc.data().address.street,
			zip: doc.data().address.zip,
			name: doc.data().name,
			keywords: doc.data().keywords
				});
				names.push(doc.data().name);
			//	this.state.markers2.push(doc.data().address.zip);

			//	console.log(doc.id, " => ", doc.data());

			});
		});
		this.setState({
			busArr:busArr
		});


		//  console.log("bye"+this.watchID);
		this._getLocationAsync();
		// this.fetchMarkerData();

		this.currentUser = await  Firebase.auth().currentUser;

		this.watchID = navigator.geolocation.watchPosition(

			position => {
			const { coordinate } =   this.state;
			const { latitude, longitude } = position.coords;

			// console.log("latitude2-"+latitude);



			const newCoordinate = {
				latitude,
				longitude
			};
			console.log(names);
			console.log("reddd");

			//console.log(index+key.city);
			const config2 = {
				headers: {'Authorization': `Bearer ${YELP_API_KEY}`},
				params: {
					latitude: latitude,
					longitude: longitude,
					limit: 10,
					sort_by: "distance",
					radius: 10000
				}
			};
			axios
			.get('https://api.yelp.com/v3/businesses/search', config2)
			//.then((res) => res.json())
				//.then((data) => {
				.then(responseJson => {
						responseJson.data.businesses.sort((a, b) => a.distance - b.distance);
				//data.sort((a, b) => a.distance - b.distance);
				this.setState({
					markers: responseJson.data.businesses.map(x => x),
				});
				console.log(responseJson.data.businesses[0]);
				this.setState({ current_zipcode: responseJson.data.businesses[0].location.zip_code });
				this.state.markers.sort(function(a,b) { return parseInt(a.distance)-parseInt(b.distance)});
				console.log("markers1");
				// console.log(this.state.markers);
			})
			.catch(error => {
				console.log(error);
			});

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

		//	console.log("zip_code->"+this.state.current_zipcode);

			console.log("cooo4");

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
		/*
		this.watchId = Location.watchPositionAsync({
		enableHighAccuracy: false,
		distanceInterval: 2000,
		timeInterval: 200000
		}, newLoc => {
		if(newLoc.timestamp && !!this.props.currentRecords) {
			this.updateLoc(newLoc)
		} else {
			console.log('ignored newLoc')
		}
		})
		*/
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
<Text style={styles.text}>Shops List</Text>





			<View style={styles.buttonContainer}>
  <TouchableOpacity style={[styles.bubble, styles.button]}>

  </TouchableOpacity>
</View>
			<Text>

</Text>
<ScrollView>
{this.state.busArr.map(item => (
	<View key={item.zip}>
	<Text style={styles.item}>{item.name} on {item.street}</Text>
	</View>
))}
</ScrollView>

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
	item: {
    backgroundColor: '#00B78D',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
		fontSize: 16
  },
  title: {
    fontSize: 32,
  },
	text: {
			fontFamily: "HelveticaNeue",
			color: "#2BB700",
			fontSize: 30,
	},
  });
  const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(ShopScreen)
