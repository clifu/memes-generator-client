import { combineReducers } from "redux";
import authReducer from "./authReducer";
import fakeDataReducer from "./fakeDataReducer";
import notificationReducer from "./notificationReducer";
import navigationReducer from "./navigationReducer"

export default combineReducers({
  auth: authReducer,
  fakeData: fakeDataReducer,  
  notifications: notificationReducer,
  navigation: navigationReducer
});
