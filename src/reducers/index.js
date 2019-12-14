import { combineReducers } from "redux";
import authReducer from "./authReducer";
import fakeDataReducer from "./fakeDataReducer";

export default combineReducers({
  auth: authReducer,
  fakeData: fakeDataReducer
});
