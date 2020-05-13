/** @format */

import React from "react";
import { Image, TextInput, Button, StyleSheet, Text, View } from "react-native";
import logo from "../assets/SPplaceholder-02.png";
import { CustomButton } from "../components/CustomButton.js";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Colors, Spacing, Typography } from "../styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateEmail, updatePassword, signup } from "../actions/user";

class SignUpScreen extends React.Component {
  SignUp = () => {
    this.props.signup();
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
                placeholder="Email"
                placeholderTextColor="#4D786E"
                style={styles.textbox}
                autoCapitalize="none"
                onChangeText={(email) => this.props.updateEmail(email)}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#4D786E"
                secureTextEntry={true}
                style={styles.textbox}
                autoCapitalize="none"
                onChangeText={(password) => this.props.updatePassword(password)}
              />
              <CustomButton
                title="Register"
                onPress={this.SignUp}
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
        </KeyboardAvoidingView>
      </ScrollView>
    );
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateEmail, updatePassword, signup }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
