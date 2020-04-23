/** @format */

import React from "react";
import SignedInStack from "./SignedInStack.js";
import SignedOutStack from "./SignedOutStack.js";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from 'react-redux'

const Navigator = (props) => {
  //console.log(store.getState());

  const AuthToken = props.auth;

  return (
    <NavigationContainer>
      {AuthToken ? <SignedInStack /> : <SignedOutStack />}
    </NavigationContainer>
  );
}

const mapStateToProps = state => {
	return {
    auth: state.auth
	}
}

export default connect(
	mapStateToProps
)(Navigator)
