/** @format */

import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen.js";
import SignUpScreen from "../screens/SignUpScreen.js";
import RecoverScreen from "../screens/RecoverScreen.js";

const LoginStack = createStackNavigator();

export default function SignedOutStack() {
  return (
    <LoginStack.Navigator initialRouteName="Login">
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="Register" component={SignUpScreen} />
      <LoginStack.Screen name="Recovery" component={RecoverScreen} />
    </LoginStack.Navigator>
  );
}
