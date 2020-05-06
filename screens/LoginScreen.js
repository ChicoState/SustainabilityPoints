/** @format */

import React from "react";
import { Image, TextInput, Button, StyleSheet, Text, View } from "react-native";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import logo from "../assets/SPplaceholder-02.png";
import { CustomButton } from "../components/CustomButton.js";
import Firebase from "../apis/Firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEmail,
  updatePassword,
  login,
  getUser,
  LoginToken
} from "../actions/user";
import { Colors, Spacing, Typography } from "../styles";

class LoginScreen extends React.Component {
  componentDidMount = () => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        
        if (this.props.user != null) {
   
    this.props.getUser(user.uid);   
          this.props.LoginToken();
        }
      }
    });
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
                style={styles.textbox}
                autoCapitalize="none"
                onChangeText={(password) => this.props.updatePassword(password)}
              />

              <CustomButton
                title="Login"
                onPress={() => this.props.login()}
                style={{ backgroundColor: "#00B78D" }}
                textStyle={{ color: "#FFF" }}
              />

              <View style={{ padding: 15 }}>
                <Button
                  title="Sign Up"
                  color="#00B78D"
                  onPress={() => this.SignUpFunc()}
                />
              </View>

              <Button
                title="Forgot Password?"
                color="#B7002A"
                onPress={() => this.RecoveryPage()}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

  SignUpFunc() {
    const { navigation } = this.props;
    navigation.navigate("Register");
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
    ...Spacing.screen,
  },
  titleText: {
    alignItems: "center",
    justifyContent: "center",
    color: Colors.titleText,
    ...Typography.titleText,
  },
  textbox: {
    borderRadius: 5,
    borderWidth: 1,
    ...Colors.textbox,
    ...Spacing.textbox,
  },
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { updateEmail, updatePassword, login, getUser, LoginToken },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
