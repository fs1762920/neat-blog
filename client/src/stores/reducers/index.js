import { combineReducers } from "redux";
import userInfoReducer from "./userInfo";
import tokenReducer from "./token";

export default combineReducers({
  userInfo: userInfoReducer,
  token: tokenReducer,
});
