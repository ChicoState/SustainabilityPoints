import React, {useState} from 'react';
import { Alert, LinearGradient, Image, TouchableOpacity, TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { CustomButton } from './components/CustomButton.js'
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import * as Font from 'expo-font'


export default function App() {

  return (

    <View> 
      <SignupScreen/>
</View>




  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00B09B',
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
         alignItems: 'center',
         marginBottom: "8%",
           alignItems: 'center',
},
   titleText: {
        fontSize: 40,
      
        textAlign: 'center',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2BB700',
        marginBottom: "8%"
      },
});
