import React, {useState} from 'react';
import { Alert, LinearGradient, Image, TouchableOpacity, TextInput, Button, StyleSheet, Text, View } from 'react-native';


const SignUpScreen = props => {
    return  <View style={{padding: 50, backgroundColor: '#FFFFFF'}}>
    <View>
    <View style={{
  justifyContent: 'center',
  alignItems: 'center',
}}>
</View>




      <Text style={styles.titleText}>Sustainability Point</Text>

     
      <TextInput  placeholder="Username"
placeholderTextColor = "#4D786E"
       style={{backgroundColor: 'rgba(247,247,247,0.6)', borderRadius: 5, borderColor: '#00B78D',borderWidth: 1,padding:10,
        marginBottom: "8%", height:50}}
        />

<TextInput  placeholder="Email"
placeholderTextColor = "#4D786E"
       style={{backgroundColor: 'rgba(247,247,247,0.6)', borderRadius: 5, borderColor: '#00B78D',borderWidth: 1,padding:10,
        marginBottom: "8%", height:50}}
        />

       <TextInput placeholder="Password"
       placeholderTextColor = "#4D786E"
        style={{backgroundColor: 'rgba(247,247,247,0.6)',borderRadius: 5, height: 50, borderColor: '#00B78D',borderWidth: 1,padding:10,
        marginBottom: "8%"}}/>

       
<View style={{padding:30}}>
      <Button title="Sign Up" color="#00B78D"/>
</View>

      <Button color="#B7002A" title="Forgot Password?"/>
      </View>
    </View>
    
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 0,
        alignItems: 'center',
    }
});

export default SignUpScreen;