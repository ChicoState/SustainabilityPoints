/** @format */

import { combineReducers } from "redux";
import {
  LOGIN,
  SIGNUP,
  GETUSER,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_DISPLAYNAME,
  UPDATE_ORGNAME,
  LOGINTOKEN,
  SIGNOUT,
} from "../actions/user";

const user = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case SIGNUP:
      return action.payload;
    case UPDATE_EMAIL:
      return { ...state, email: action.payload };
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload };
    case UPDATE_DISPLAYNAME:
      return { ...state, displayname: action.payload };
    case UPDATE_ORGNAME:
      return { ...state, orgname: action.payload };
    case GETUSER:
      return action.payload;
    default:
      return state;
  }
};

const auth = (state = false, action) => {
  switch (action.type) {
    case LOGINTOKEN:
      return !state;
    case SIGNOUT:
      return !state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: user,
  auth: auth,
});

export default rootReducer;
