/** @format */

import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileScreen from "../screens/ProfileScreen.js";
import MyLocationScreen from "../screens/MyLocationScreen.js";
import ProfileUpdateScreen from "../screens/ProfileUpdateScreen";
import ShopScreen from "../screens/ShopScreen.js";

const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator initialRouteName="Profile">
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen name="ProfileUpdate" component={ProfileUpdateScreen} />
    <ProfileStack.Screen name="Shops" component={ShopScreen} />
    <ProfileStack.Screen name="MyLocation" component={MyLocationScreen} />
  </ProfileStack.Navigator>
);

export default function SignedInStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
      <Tab.Screen name="Shops" component={ShopScreen} />
      <Tab.Screen name="MyLocation" component={MyLocationScreen} />
    </Tab.Navigator>
  );
}
