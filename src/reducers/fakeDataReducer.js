import {
  CREATE_OBJECT,
  FETCH_OBJECT,
  EDIT_OBJECT,
  DELETE_OBJECT
} from "../actions/types";
import _ from "lodash";

export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case CREATE_OBJECT:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_OBJECT:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_OBJECT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_OBJECT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
