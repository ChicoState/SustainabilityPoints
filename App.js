/** @format */

import "react-native-gesture-handler";
import React from "react";
import SignUpScreen from "./screens/SignUpScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import RecoverScreen from "./screens/RecoverScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import ShopScreen from "./screens/ShopScreen.js";
import MyLocationScreen from "./screens/MyLocationScreen.js";
import ProfileUpdateScreen from './screens/ProfileUpdateScreen'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "./screens/context.js";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'

import { decode, encode } from 'base-64'

if ( !global.btoa ) { global.btoa = encode }
if ( !global.atob ) { global.atob = decode }

const Tab = createBottomTabNavigator();
const LoginStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const MyLocationStack = createStackNavigator();
const ShopStack = createStackNavigator();

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)

const ProfileStackScreen = () => (
  <ProfileStack.Navigator initialRouteName="Profile">
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

function App() {
  
  /*
  comment out the first one to be forced into the main app stack
  or comment out the second one to return to the login stages
  */
  const [UserToken, setUserToken] = React.useState(null);
  //const [UserToken, setUserToken] = React.useState("Authenticated");

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setUserToken("authenticated");
      },

      signOut: () => {
        setUserToken(null);
      }
    };
  }, []);

 
  return (
    <Provider store={store}>
    <AuthContext.Provider value={AuthContext}>
      <NavigationContainer>
        {UserToken ? (
          <Tab.Navigator>
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
          </Tab.Navigator>
        ) : (
          <LoginStack.Navigator initialRouteName="Login">
            <LoginStack.Screen name="Login" component={LoginScreen} />
            <LoginStack.Screen name="Register" component={SignUpScreen} />
            <LoginStack.Screen name="Recovery" component={RecoverScreen} />
            <LoginStack.Screen name="Profile" component={ProfileScreen} />
            <LoginStack.Screen name="MyLocation" component={MyLocationScreen} />
            <LoginStack.Screen name="ProfileUpdate" component={ProfileUpdateScreen} />
            <LoginStack.Screen name="Shops" component={ShopScreen} />
          </LoginStack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
    </Provider>
  );
};

export default App;
