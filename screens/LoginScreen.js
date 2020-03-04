import React, {useState} from 'react';
import { Alert, LinearGradient, Image, TouchableOpacity, TextInput, Button, StyleSheet, Text, View } from 'react-native';
//import { CustomButton } from './CustomButton.js';
//import logo from './assets/SPplaceholder-02.png';
import * as Font from 'expo-font'


export default function App() {

  return (

    <View style={{padding: 50, backgroundColor: '#FFFFFF'}}>
    <View>
    <View style={{
  justifyContent: 'center',
  alignItems: 'center',
}}>
      <Image source={logo} style={{marginBottom: "2%"}} />
</View>




      <Text style={styles.titleText}>Sustainability Points</Text>


      <TextInput  placeholder="Username"
placeholderTextColor = "#4D786E"
       style={{backgroundColor: 'rgba(247,247,247,0.6)', borderRadius: 5, borderColor: '#00B78D',borderWidth: 1,padding:10,
        marginBottom: "8%", height:50}}
        />

       <TextInput placeholder="Password"
       placeholderTextColor = "#4D786E"
        style={{backgroundColor: 'rgba(247,247,247,0.6)',borderRadius: 5, height: 50, borderColor: '#00B78D',borderWidth: 1,padding:10,
        marginBottom: "8%"}}/>

        <CustomButton
                    title="Login"
                    onPress={() => Alert.alert(`Why you opened me? Go away, it's mine!`)}
                    style={{backgroundColor: "#00B78D", }}
                    textStyle={{ color:"#FFF" }}
                />

<View style={{padding:30}}>
      <Button title="Sign Up" color="#00B78D"/>
</View>

      <Button color="#B7002A" title="Forgot Password?"/>
      </View>
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
