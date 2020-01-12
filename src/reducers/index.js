import {combineReducers} from "redux";
import authReducer from "./authReducer";
import memesReducer from "./memesReducer";
import notificationReducer from "./notificationReducer";
import navigationReducer from "./navigationReducer";
import viewedUserProfileReducer from "./viewedUserProfileReducer";
import userProfileReducer from "./userProfileReducer";
import generatedMemeReducer from "./generatedMemeReducer";

export default combineReducers({
    auth: authReducer,
    meme: memesReducer,
    notifications: notificationReducer,
    navigation: navigationReducer,
    viewedProfileData: viewedUserProfileReducer,
    userProfileData: userProfileReducer,
    generatedMeme: generatedMemeReducer
});
