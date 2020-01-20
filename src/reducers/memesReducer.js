import {CREATE_MEME, DELETE_MEME, EDIT_MEME, FETCH_MEME, FETCH_MEMES, RATE_MEME} from "../actions/types";
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
        case RATE_MEME:
            return action.payload.positive
                ? {...state, [action.payload.id] : {...state[action.payload.id], positiveRates: state[action.payload.id].positiveRates + 1}}
                : {...state, [action.payload.id] : {...state[action.payload.id], negativeRates: state[action.payload.id].negativeRates + 1}}; 
            
        default:

            return{...state};
    }
};