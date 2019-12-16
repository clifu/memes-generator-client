import { combineReducers } from "redux";
import authReducer from "./authReducer";
import memesReducer from "./memesReducer";
import notificationReducer from "./notificationReducer";
import navigationReducer from "./navigationReducer";

export default combineReducers({
  auth: authReducer,
  meme: memesReducer,
  notifications: notificationReducer,
  navigation: navigationReducer
});
