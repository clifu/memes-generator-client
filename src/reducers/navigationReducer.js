import {
   CHANGE_BOOKMARK
} from "../actions/types";
import initialState from "./initialState";

export default (state = initialState.activeBookmarkId, action) => {
    switch (action.type) {
        case CHANGE_BOOKMARK:
            return {
                ...state,
                activeBookmarkId: action.payload
            };
        default:
            return state;
    }
};
