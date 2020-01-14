import {CREATE_MEME, DELETE_MEME, EDIT_MEME, FETCH_MEME, FETCH_MEMES} from "../actions/types";
import _ from "lodash";
import initialState from "./initialState";

export default (state = initialState.memes, action) => {
    switch (action.type) {
        case FETCH_MEMES:
            return {...state, ..._.mapKeys(action.payload, "id")};
        case CREATE_MEME:
            return {...state, [action.payload.id]: action.payload};
        case FETCH_MEME:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_MEME:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_MEME:
            return _.omit(state, action.payload);
        default:

            return{...state};
    }
};