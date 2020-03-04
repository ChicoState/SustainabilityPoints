import React, {useState} from 'react';
import { Alert, LinearGradient, Image, TouchableOpacity, TextInput, Button, StyleSheet, Text, View } from 'react-native';
import logo from '../assets/SPplaceholder.png';
import { CustomButton } from '../components/CustomButton.js'

const SignUpScreen = props => {
    return  <View style={{padding: 50, backgroundColor: '#FFFFFF'}}>
    <View>
    <View style={{
  justifyContent: 'center',
  alignItems: 'center',
}}>
       <Image source={logo} style={{marginBottom: "2%"}} />
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


<CustomButton
                    title="SignUp"
                    onPress={() => Alert.alert(`Why you opened me? Go away, it's mine!`)}
                    style={{backgroundColor: "#00B78D", }}
                    textStyle={{ color:"#FFF" }}
                />
       
<View style={{padding:30}}>
      <Button title="Logi" color="#00B78D"/>
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