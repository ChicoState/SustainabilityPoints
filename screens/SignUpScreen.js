import React, {useState} from 'react';
import { Alert, LinearGradient, Image, TouchableOpacity, TextInput, Button, StyleSheet, Text, View } from 'react-native';
import logo from '../assets/SPplaceholder-02.png';
import { CustomButton } from '../components/CustomButton.js'

import Firebase from '../apis/Firebase'

export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }
    Signup = (email, password) =>{
        try {
            Firebase
                .auth()
                .createUserWithEmailAndPassword(email,password)
                .then(user => {
                    console.log(user);
                });
        } catch (error) {
        console.log(error.toString(error));
        }
    }
    render () {
        return   (    
            <View style={{ padding: 50, backgroundColor: '#FFFFFF', justifyContent: 'center',  alignItems: 'center',}}>
                <Image source={logo} style={{marginBottom: "2%"}} />
                <Text>Sustainability Point</Text>
                <TextInput  placeholder="Username" placeholderTextColor = "#4D786E" style={{
                    backgroundColor: 'rgba(247,247,247,0.6)',
                    borderRadius: 5,
                    borderColor: '#00B78D',
                    borderWidth: 1,
                    padding:10,
                    marginBottom: "8%",
                    height:50}}/>

                <TextInput  placeholder="Email" placeholderTextColor = "#4D786E"
                    onChangeText={email => this.SetState({ email })}
                    style={{
                        backgroundColor: 'rgba(247,247,247,0.6)',
                        borderRadius: 5,
                        borderColor: '#00B78D',
                        borderWidth: 1,
                        padding:10,
                        marginBottom: "8%",
                        height:50}}/>

                <TextInput placeholder="Password" placeholderTextColor = "#4D786E"
                    onChangeText={password => this.SetState({ password })}
                    style={{
                        backgroundColor: 'rgba(247,247,247,0.6)',
                        borderRadius: 5,
                        height: 50,
                        borderColor: '#00B78D',
                        borderWidth: 1,
                        padding:10,
                        marginBottom: "8%"}}/>

                <CustomButton title="SignUp" 
                    onPress={ () => this.Signup(this.state.email, this.state.password)}
                    style={{backgroundColor: "#00B78D", }}
                    textStyle={{ color:"#FFF" }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 0,
        alignItems: 'center',
    }
});