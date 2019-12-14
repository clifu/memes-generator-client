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
        userId: action.payload.id,
        userToken: action.payload.token,
        userTokenExpirationTime: action.payload.tokenExpirationTime
      };
    case REGISTER_USER_SUCESS:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.id,
        userToken: action.payload.token,
        userTokenExpirationTime: action.payload.tokenExpirationTime
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
