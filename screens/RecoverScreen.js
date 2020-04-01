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

import Firebase from "./../apis/Firebase";

Firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
    console.log("we are authenticated now!");
  }
});

class RecoverScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  Recover = (email, password) => {
    try {
      Firebase.auth()
        .sendPasswordResetEmail(email)
        .then(res => {
          //console.log(res.user.email);
          navigation.navigate("Login");
        });
    } catch (error) {
      console.log(error.toString(error));
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={style.container}>
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image source={logo} style={{ marginBottom: "2%" }} />
            </View>
            <Text style={styles.titleText}>Sustainability Points</Text>
            <TextInput
              placeholder="Username"
              placeholderTextColor="#4D786E"
              style={styles.textbox}
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#4D786E"
              style={styles.textbox}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
            />

            <CustomButton
              title="Recover Password"
              onPress={() =>
                this.Recover(this.state.email, this.state.password)
              }
              style={{ backgroundColor: "#00B78D" }}
              textStyle={{ color: "#FFF" }}
            />

            <View style={{ padding: 15 }}>
              <Button
                title="Already a User? Login"
                color="#00B78D"
                onPress={() => this.LoginFunc()}
              />
            </View>

            <Button
              title="Sign Up"
              color="#00B78D"
              onPress={() => this.SignUpFunc()}
            />
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

  SignUpFunc() {
    const { navigation } = this.props;
    navigation.navigate("Register");
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
  return <RecoverScreen {...props} navigation={navigation} />;
}
