import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import SignUpScreen from "./screens/SignUpScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import RecoverScreen from "./screens/RecoverScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Firebase from "./apis/Firebase";

const LoginStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <LoginStack.Navigator initialRouteName="Login">
        <LoginStack.Screen name="Login" component={LoginScreen} />
        <LoginStack.Screen name="Profile" component={ProfileScreen} />
        <LoginStack.Screen name="Register" component={SignUpScreen} />
        <LoginStack.Screen name="Recovery" component={RecoverScreen} />
      </LoginStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00B09B",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    display: "flex",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#2AC062",
    shadowColor: "#2AC062",
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20
  },
  text: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "#FFFFFF",
    alignItems: "center",
    marginBottom: "8%",
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
  }
});

export default App;
