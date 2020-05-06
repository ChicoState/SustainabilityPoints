/** @format */

import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { decode, encode } from "base-64";
import Navigator from "./navigation/Navigator.js";
import store from "./navigation/store.js";


if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;
