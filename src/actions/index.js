import {
    CHANGE_BOOKMARK,
    CLEAR_VIEWED_PROFILE,
    CREATE_MEME,
    DELETE_MEME,
    DISMISS_NOTIFICATION,
    EDIT_MEME,
    FETCH_FRIENDS_FOR_USER_PROFILE,
    FETCH_MEME,
    FETCH_MEMES,
    FETCH_MEMES_FOR_USER_PROFILE,
    FETCH_PENDING_FRIEND_REQUESTS,
    FETCH_USER_PROFILE,
    GENERATE_MEME_IMAGE,
    RATE_MEME,
    REGISTER_USER_SUCESS,
    SAVE_USER_DATA,
    SIGN_IN_SUCCESS,
    SIGN_OUT,
    FETCH_SEARCH_USERS
} from "./types";
import login from "../apis/login";
import {
    getAllPendingFriendRequests,
    getFriendsOfSpecificUser,
    getMeme,
    getMemes,
    getMemesForSpecificUser,
    getUserProfileDataByAccountId,
    getUserProfileDataByUserProfileId,
    getSearchUsers
} from "../apis/gets";
import {generateMemeImage, postMeme, postRateMeme} from "../apis/posts";
import {acceptPendingFriendRequest, rejectPendingFriendRequest, updateMeme} from "../apis/puts";
import {deleteThatMeme} from "../apis/deletions";
import register from "../apis/register";
import history from "../history";
import MemeDTO from "../DTO/MemeDTO";
import Cookies from "js-cookie";
import {toast} from "react-toastify";

//AUTH SECTION

export const signIn = (email, password) => async dispatch => {
    await login(email, password)
        .then(response => {
            dispatch(loginSuccess(response.data));
        })
        .catch(error => loginError(error));
};

export const loginFromCache = data => async dispatch => {
    dispatch(loginSuccess(data));
};

const getUserDataAfterLogin = id => async dispatch => {
    var response = await getUserProfileDataByAccountId(id);
    Cookies.set("username", response.username);
    Cookies.set("firstName", response.firstName);
    Cookies.set("lastName", response.lastName);
    Cookies.set("profileImageUrl", response.profileImageUrl);
    Cookies.set("thumbnailImageUrl", response.thumbnailImageUrl);

    dispatch(saveUserData(response.data));

};

export const loginSuccess = (data, type) => async dispatch => {
    const {id, token, expirationTime, profileId} = data;
    Cookies.set("userId", id);
    Cookies.set("userToken", token);
    Cookies.set("userTokenExpirationTime", expirationTime);
    Cookies.set("profileId", profileId);

    history.push("/list");

    dispatch([
        getUserDataAfterLogin(id),
        {
            type: type ? REGISTER_USER_SUCESS : SIGN_IN_SUCCESS,
            payload: {id, token, expirationTime, profileId}
        }
    ]);

    history.push("/list");
};

export const signOut = () => {
    Cookies.remove("userId");
    Cookies.remove("userToken");
    Cookies.remove("userTokenExpirationTime");
    Cookies.remove("username");
    Cookies.remove("profileId");
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("profileImageUrl");
    Cookies.remove("thumbnailImageUrl");

    return {type: SIGN_OUT};
};

const loginError = error => {
    toast.error(error.response ? error.response.data.message : error.message);
    console.log(error);
};

export const dismissNotification = id => {
    return {
        type: DISMISS_NOTIFICATION,
        payload: id
    };
};

const registerFailure = error => {
    toast.error(error.response ? error.response.data.message : error.message);
    console.log(error);
};

export const processReceivedNotification = message => {
    toast.info(message.message);
};

export function registerUser({
                                 email,
                                 password,
                                 username,
                                 firstName,
                                 lastName,
                                 dateOfBirth,
                                 phone
                             }) {
    return async dispatch => {
        await register({
            email,
            password,
            username,
            firstName,
            lastName,
            dateOfBirth,
            phone
        })
            //on registerSucess just login registrered user
            .then(response =>
                dispatch(loginSuccess(response.data, REGISTER_USER_SUCESS))
            )
            .catch(error => registerFailure(error));

        return {};
    };
}

export const saveUserData = data => {

    return {
        type: SAVE_USER_DATA,
        payload: data
    };
};

//region MEMES
export const fetchMemes = () => async dispatch => {
    const response = await getMemes();
    dispatch({
        type: FETCH_MEMES,
        payload: response.data
    });
};

export function createMemeImage(data) {
    return async dispatch => {
        const response = await generateMemeImage(data);
        dispatch({
            type: GENERATE_MEME_IMAGE,
            payload: response.data
        });
    }
}

export function createMeme(data) {
    return async dispatch => {
        const response = await postMeme(data);
        dispatch({
            type: CREATE_MEME,
            payload: response.data
        });
        history.push("/list");
    };
}

export function rateMeme(data) {
    return async dispatch => {
        await postRateMeme(data)
        .then(() => dispatch({
            type: RATE_MEME,
            payload: {id: data.postId, positive: data.positiveRate}
        }))
        .catch(error => {console.log(error); toast.error(error.response.data)})
        
    };
}

export const editMeme = (postId, formValues) => async dispatch => {
    const post = new MemeDTO(postId, formValues.title, formValues.description, formValues.imageUrl, formValues.profileId);
    const response = await updateMeme(post);
    dispatch({type: EDIT_MEME, payload: post});
    history.push("/list");
};

export const deleteMeme = postId => async dispatch => {
    await deleteThatMeme(postId);
    dispatch({type: DELETE_MEME, payload: postId});
    history.push("/list");
};

export const fetchMeme = postId => async dispatch => {
    const response = await getMeme(postId);
    dispatch({type: FETCH_MEME, payload: response.data});
};

//region USER PROFILES
export const fetchUserProfile = userProfileId => async dispatch => {
    const response = await getUserProfileDataByUserProfileId(userProfileId);
    dispatch({type: FETCH_USER_PROFILE, payload: response.data});
    history.push(`/profile/${userProfileId}`);
};

export const fetchSearchUsers = searchString => async dispatch => {
    const response = await getSearchUsers(searchString);
    dispatch({type: FETCH_SEARCH_USERS, payload: response.data});
};

export const fetchMemesForSpecificUser = userProfileId => async dispatch => {
    const response = await getMemesForSpecificUser(userProfileId);
    dispatch({type: FETCH_MEMES_FOR_USER_PROFILE, payload: response.data});
};

export const fetchFriendsForSpecificUser = userProfileId => async dispatch => {
    const response = await getFriendsOfSpecificUser(userProfileId);
    dispatch({type: FETCH_FRIENDS_FOR_USER_PROFILE, payload: response.data});
};

export const fetchAllPendingFriendRequests = userProfileId => async dispatch => {
    const response = await getAllPendingFriendRequests(userProfileId);
    var allFriendRequestsWithProfiles = response.data.map(
        async friendRequest => {
            var friendProfile = await getUserProfileDataByUserProfileId(
                friendRequest.senderId
            );
            return {
                friendRequest: friendRequest,
                friendRequestSenderProfile: friendProfile.data
            };
        }
    );

    Promise.all(allFriendRequestsWithProfiles).then(data => {
        dispatch({
            type: FETCH_PENDING_FRIEND_REQUESTS,
            payload: data
        });
    })

};

export const rejectFriendRequest = (
    requestId,
    friendRequest
) => async dispatch => {
    const response = await rejectPendingFriendRequest(requestId, friendRequest);
};

export const acceptFriendRequest = (
    requestId,
    friendRequest
) => async dispatch => {
    const response = await acceptPendingFriendRequest(requestId, friendRequest);
};

export const clearViewedProfile = () => {
    return {type: CLEAR_VIEWED_PROFILE};
};

export const setActiveBookmarkIndex = id => {
    return {
        type: CHANGE_BOOKMARK,
        payload: id
    };
};
