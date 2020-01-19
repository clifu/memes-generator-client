import initialState from "./initialState";
import { SAVE_USER_DATA, FETCH_SEARCH_USERS } from "../actions/types";
import _ from "lodash";

export default (state = initialState.userProfileData, action) => {
  switch (action.type) {
    case SAVE_USER_DATA:
      return {
        ...state,
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        profileImageUrl: action.payload.profileImageUrl,
        thumbnailImageUrl: action.payload.thumbnailImageUrl
      };
    case FETCH_SEARCH_USERS:
      return {
        ...state,
        searchUsersProfiles: action.payload
    };
    default:
      return { ...state };
  }
};
