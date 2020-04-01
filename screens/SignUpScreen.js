/** @format */

import React from "react";
import {
  Image,
  TextInput,
  Button,
  StyleSheet,
  Text,
  View
} from "react-native";
import logo from "../assets/SPplaceholder-02.png";
import { CustomButton } from "../components/CustomButton.js";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors, Spacing, Typography } from '../styles'

import Firebase, { db } from "./../apis/Firebase";

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
      password: "",
      password2: ""
    };
  }
  SignUp = (email, password) => {
    try {
        const response = Firebase.auth().createUserWithEmailAndPassword(email, password)
        if (response.user.uid) {
          db.collection('users')
            .doc(response.user.uid)
            .set({
              points_current: 0,
              points_lifetime: 0
            })
        }

      // Firebase.auth()
      //   .createUserWithEmailAndPassword(email, password)
      //   .then(user => {
      //     console.log(user);
      //   });
    } catch (error) {
      console.log(error.toString(error));
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image source={logo} style={{ marginBottom: "2%" }} />
            </View>
            <Text style={styles.titleText}>Sustainability Points</Text>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#4D786E"
              style={styles.textbox}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#4D786E"
              secureTextEntry={true}
              style={styles.textbox}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
            />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#4D786E"
              secureTextEntry={true}
              style={styles.textbox}
              autoCapitalize="none"
              onChangeText={password2 => this.setState({ password2 })}
            />
            <CustomButton
              title="Register"
              onPress={() => this.SignUp(this.state.email, this.state.password)}
              style={{ backgroundColor: "#00B78D" }}
              textStyle={{ color: "#FFF" }}
            />

            <View style={{ padding: 15 }}>
              <Button
                title="Forgot Password?"
                color="#B7002A"
                onPress={() => this.RecoveryPage()}
              />

              <View style={{ padding: 10 }}>
                <Button
                  title="Already a User? Login"
                  color="#00B78D"
                  onPress={() => this.LoginFunc()}
                />
              </View>
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
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    ...Spacing.screen
  },
  titleText: {
    alignItems: "center",
    justifyContent: "center",
    color: Colors.titleText,
    ...Typography.titleText
  },
  textbox: {
    borderRadius: 5,
    borderWidth: 1,
    ...Colors.textbox,
    ...Spacing.textbox
  }
});

export default function(props) {
  const navigation = useNavigation();
  return <SignUpScreen {...props} navigation={navigation} />;
}
