import {
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  REGISTER_USER_SUCESS,
  SAVE_USER_DATA
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
        userTokenExpirationTime: action.payload.expirationTime
      };
    case REGISTER_USER_SUCESS:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.id,
        userToken: action.payload.token,
        userTokenExpirationTime: action.payload.expirationTime
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        userToken: null,
        userTokenExpirationTime: null
      };
    case SAVE_USER_DATA:
      return {
        ...state,
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        profileImageUrl: action.payload.profileImageUrl,
        thumbnailImageUrl: action.payload.thumbnailImageUrl
      }
    default:
      return state;
  }
};
