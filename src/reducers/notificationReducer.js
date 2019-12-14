import initialState from "./initialState";
import { DISMISS_NOTIFICATION, DISPLAY_NOTIFICATION } from "../actions/types";

export default (state = initialState.notifications, action) => {
  switch (action.type) {
    case DISMISS_NOTIFICATION:
      var notifications = [...state];
      notifications.splice(action.payload, 1);
      return notifications;
    case DISPLAY_NOTIFICATION:
      return [...state, action.payload.content];
    default:
      return [...state];
  }
};