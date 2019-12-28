import initialState from "./initialState";
import { SAVE_USER_DATA } from "../actions/types";
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
    default:
      return { ...state };
  }
};
