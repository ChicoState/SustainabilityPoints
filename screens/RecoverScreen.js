/** @format */

import React from "react";
import { Image, TextInput, Button, StyleSheet, Text, View } from "react-native";
import logo from "../assets/SPplaceholder-02.png";
import { CustomButton } from "../components/CustomButton.js";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors, Spacing, Typography } from "../styles";
import Firebase from "./../apis/Firebase";

class RecoverScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  Recover = (email) => {
    try {
      Firebase.auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          navigation.navigate("Login");
        });
    } catch (error) {
      console.log(error.toString(error));
    }
  };

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.Os == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.container}>
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
                onChangeText={(email) => this.setState({ email })}
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
        </KeyboardAvoidingView>
      </ScrollView>
    );
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
    alignItems: "center",
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: "center",
    ...Spacing.screen,
  },
  textbox: {
    borderRadius: 5,
    borderWidth: 1,
    ...Colors.textbox,
    ...Spacing.textbox,
  },
  titleText: {
    alignItems: "center",
    color: Colors.titleText,
    justifyContent: "center",
    ...Typography.titleText,
  },
});

export default function (props) {
  const navigation = useNavigation();
  return <RecoverScreen {...props} navigation={navigation} />;
}
