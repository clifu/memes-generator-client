import {
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  REGISTER_USER_SUCESS
} from "../actions/types";
import initialState from "./initialState";

export default (state = initialState.auth, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.userId,
        userToken: action.payload.userToken,
        userTokenExpirationTime: action.payload.userTokenExpirationTime
      };
    case REGISTER_USER_SUCESS:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.userId,
        userToken: action.payload.userToken,
        userTokenExpirationTime: action.payload.userTokenExpirationTime
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        userToken: null,
        userTokenExpirationTime: null
      };
    default:
      return state;
  }
};
