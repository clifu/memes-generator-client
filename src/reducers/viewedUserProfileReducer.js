import initialState from "./initialState";
import {
  FETCH_USER_PROFILE,
  FETCH_MEMES_FOR_USER_PROFILE,
  FETCH_FRIENDS_FOR_USER_PROFILE,
  FETCH_PENDING_FRIEND_REQUESTS
} from "../actions/types";
import _ from "lodash";

export default (state = initialState.viewedProfileData, action) => {
  switch (action.type) {
    case FETCH_MEMES_FOR_USER_PROFILE:
      return {
        ...state,
        userMemes: action.payload
      };
    case FETCH_FRIENDS_FOR_USER_PROFILE:
      return {
        ...state,
        friends: action.payload
      };
    case FETCH_USER_PROFILE:
      return {
        ...state,
        userProfileId: action.payload.id,
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName
      };
    case FETCH_PENDING_FRIEND_REQUESTS:
      return {
        ...state,
        friendsRequests: action.payload
      };
    default:
      return { ...state };
  }
};
