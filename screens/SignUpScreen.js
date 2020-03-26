import React, { useState } from "react";
import {
  Alert,
  LinearGradient,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  Text,
  View
} from "react-native";
import logo from "../assets/SPplaceholder-02.png";
import { CustomButton } from "../components/CustomButton.js";
import { ScrollView } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import Firebase from "./../apis/Firebase";

Firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
    console.log("we are authenticated now!");
  }
});

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  SignUp = (email, password) => {
    try {
      Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);
        });
    } catch (error) {
      console.log(error.toString(error));
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={{ padding: 50, backgroundColor: "#FFFFFF" }}>
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image source={logo} style={{ marginBottom: "2%" }} />
            </View>
            <Text style={styles.titleText}>Sustainability Points</Text>
            <TextInput
              placeholder="Username"
              placeholderTextColor="#4D786E"
              style={styles.textbox}
              autoCapitalize = 'none'
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#4D786E"
              style={styles.textbox}
              autoCapitalize = 'none'
              onChangeText={email => this.setState({ email })}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#4D786E"
              style={styles.textbox}
              autoCapitalize = 'none'
              onChangeText={password => this.setState({ password })}
            />
            <CustomButton
              title="Register"
              onPress={() => this.SignUp(this.state.email, this.state.password)}
              style={{ backgroundColor: "#00B78D" }}
              autoCapitalize = 'none'
              textStyle={{ color: "#FFF" }}
            />

            <View style={{ padding: 15 }}>
              <Button
                title="Already a User? Login"
                color="#00B78D"
                onPress={() => this.LoginFunc()}
              />
            </View>

            <View style={{ padding: 0 }}>
              <Button
                title="Forgot Password?"
                color="#B7002A"
                onPress={() => this.RecoveryPage()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
    const { navigation } = this.props;
  }

  LoginFunc() {
    const { navigation } = this.props;
    navigation.navigate("Login");
  }

  RecoveryPage() {
    const { navigation } = this.props;
    navigation.navigate("Recovery");
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 0,
    alignItems: "center"
  },

  titleText: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    color: "#2BB700",
    marginBottom: "8%"
  },

  textbox: {
    backgroundColor: "rgba(247,247,247,0.6)",
    borderRadius: 5,
    borderColor: "#00B78D",
    borderWidth: 1,
    padding: 10,
    marginBottom: "8%",
    height: 50
  }
});

export default function(props) {
  const navigation = useNavigation();
  return <SignUpScreen {...props} navigation={navigation} />;
}
