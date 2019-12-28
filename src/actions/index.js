import {
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  REGISTER_USER_SUCESS,
  CREATE_MEME,
  EDIT_MEME,
  DELETE_MEME,
  FETCH_MEME,
  DISMISS_NOTIFICATION,
  DISPLAY_NOTIFICATION,
  SAVE_USER_DATA,
  CHANGE_BOOKMARK,
  FETCH_MEMES
} from "./types";
import login from "../apis/login";
import {
  getUserProfileDataByAccountId,
  getMemes,
  getMeme,
  getMemesOfMyFriends,
  getMemesForSpecificUser
} from "../apis/gets";
import { postMeme } from "../apis/posts";
import { updateMeme } from "../apis/puts";
import { deleteThatMeme } from "../apis/deletions";
import register from "../apis/register";
import history from "../history";
import axios from "../apis/axios";
import MemeDTO from "../DTO/MemeDTO";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

//AUTH SECTION

export const signIn = (email, password) => async dispatch => {
  await login(email, password)
    .then(response => {
      dispatch(loginSuccess(response.data));
      history.push("/list");
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
  const { id, token, expirationTime, profileId } = data;
  Cookies.set("userId", id);
  Cookies.set("userToken", token);
  Cookies.set("userTokenExpirationTime", expirationTime);
  Cookies.set("profileId", profileId);

  dispatch([
    getUserDataAfterLogin(id),
    {
      type: type ? REGISTER_USER_SUCESS : SIGN_IN_SUCCESS,
      payload: { id, token, expirationTime, profileId }
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

  return { type: SIGN_OUT };
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

export const registerUser = ({
  email,
  password,
  username,
  firstName,
  lastName,
  dateOfBirth,
  phone
}) => async dispatch => {
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

export const saveUserData = data => {
  return {
    type: SAVE_USER_DATA,
    payload: data
  };
};

//region
export const fetchMemes = () => async dispatch => {
  const response = await getMemes();
  dispatch({
    type: FETCH_MEMES,
    payload: response.data
  });
};

export const createMeme = data => async dispatch => {
  const response = await postMeme(data);
  dispatch({
    type: CREATE_MEME,
    payload: response.data
  });
  history.push("/list");
};

export const editMeme = (postId, formValues) => async dispatch => {
  var post = new MemeDTO(postId, formValues.title, formValues.description);
  const response = await updateMeme(post);
  dispatch({ type: EDIT_MEME, payload: post });
  history.push("/list");
};

export const deleteMeme = postId => async dispatch => {
  await deleteThatMeme(postId);
  dispatch({ type: DELETE_MEME, payload: postId });
  history.push("/list");
};

export const fetchMeme = postId => async dispatch => {
  const response = await getMeme(postId);
  dispatch({ type: FETCH_MEME, payload: response.data });
};

export const setActiveBookmarkIndex = id => {
  return {
    type: CHANGE_BOOKMARK,
    payload: id
  };
};
