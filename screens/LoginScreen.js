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
import { ScrollView } from "react-native";
import logo from "../assets/SPplaceholder-02.png";
import { CustomButton } from "../components/CustomButton.js";
import { useNavigation } from "@react-navigation/native";
import Firebase from "./../apis/Firebase";
import { AuthContext } from "./context.js";

import { Colors, Spacing, Typography } from '../styles'

Firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
    console.log("we are authenticated now!");
  }
});

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  Login = (email, password) => {
    const { navigation } = this.props;
    try {
      Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res.user.email);
          navigation.navigate("Profile")
          //signIn();
        });
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

            <TextInput
              placeholder="Password"
              placeholderTextColor="#4D786E"
              style={styles.textbox}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
            />

            <CustomButton
              title="Login"
              onPress={() => this.Login(this.state.email, this.state.password)}
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
  const { signIn } = React.useContext(AuthContext);
  return <LoginScreen {...props} navigation={navigation} />;
}
