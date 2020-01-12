import {GENERATE_MEME_IMAGE} from "../actions/types";
import initialState from "./initialState";

export default (state = initialState.generatedMeme, action) => {
    switch (action.type) {
        case GENERATE_MEME_IMAGE:
            return {...state, imageUrl: action.payload.data.url};
        default:
            return {...state};
    }
};
