import * as React from 'react';
import { Image, TouchableOpacity, TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { CustomButton } from './CustomButton.js';
import logo from './assets/SPplaceholder.png';
//import useLinking from './navigation/useLinking';
import HomeScreen from '../screens/HomeScreen.js';

export default function App() {

  return (
    <View style={{padding: 50}}>
      <View>
      <Image source={logo} />
      <Text style={styles.titleText}>Sustainability Points</Text>
      <TextInput placeholder="Username"
       style={{borderColor: 'black',borderWidth: 1,padding:10, marginBottom: "8%"}}/>

       <TextInput placeholder="Password"
        style={{borderColor: 'black',borderWidth: 1,padding:10, marginBottom: "8%"}}/>
        <CustomButton
                    title="Login"
                    onPress={() => Alert.alert(`Why you opened me? Go away, it's mine!`)}
                    style={{ /* some styles for button */ }}
                    textStyle={{ /* styles for button title */ }}
                />
      <Text>Don't have an account?</Text><Button title="Sign Up Now"/>

      <Button title="Forgot Password?"/>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00b09b',
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
},
         titleText: {
        fontSize: 20,
        fontWeight: 'bold',
      },
});
