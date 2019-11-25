import { CREATE_OBJECT } from "../actions/types";
import _ from "lodash";

export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case CREATE_OBJECT:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
