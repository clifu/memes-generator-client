import {
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  REGISTER_USER_SUCESS,
  CREATE_OBJECT,
  EDIT_OBJECT,
  DELETE_OBJECT,
  FETCH_OBJECT,
  DISMISS_NOTIFICATION,
  DISPLAY_NOTIFICATION,
  SAVE_USER_DATA, CHANGE_BOOKMARK
} from "./types";
import login from "../apis/login";
import { getUserProfileDataByAccountId, getFakeData } from "../apis/gets";
import { postFakeData } from "../apis/posts";
import register from "../apis/register";
import history from "../history";
import axios from "../apis/axios";
import MemeDTO from "../DTO/MemeDTO";
import Cookies from "js-cookie";

//AUTH SECTION

export const signIn = (email, password) => async dispatch => {
  await login(email, password)
      .then(response => {
        dispatch(loginSuccess(response.data));
        history.push("/list");
      })
      .catch(error => dispatch(loginError(error)));

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
  const { id, token, expirationTime } = data;

  Cookies.set("userId", id);
  Cookies.set("userToken", token);
  Cookies.set("userTokenExpirationTime", expirationTime);

  dispatch([getUserDataAfterLogin(id),{
    type: type ? REGISTER_USER_SUCESS : SIGN_IN_SUCCESS,
    payload: { id, token, expirationTime }
  }]);

  history.push("/list");
};

export const signOut = () => {
  Cookies.remove("userId");
  Cookies.remove("userToken");
  Cookies.remove("userTokenExpirationTime");
  Cookies.remove("username");
  Cookies.remove("firstName");
  Cookies.remove("lastName");
  Cookies.remove("profileImageUrl");
  Cookies.remove("thumbnailImageUrl");

  return { type: SIGN_OUT };
};

const loginError = error => {
  history.push("/login");
  console.log(error);
  return {
    type: DISPLAY_NOTIFICATION,
    payload: { content: error.response ? error.response.data : error }
  };
};

export const dismissNotification = id => {
  return {
    type: DISMISS_NOTIFICATION,
    payload: id
  };
};

const registerFailure = error => {
  history.push("/register");
  console.log(error);
  return {
    type: DISPLAY_NOTIFICATION,
    payload: { content: error.response ? error.response.data : error }
  };
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
    .catch(error => dispatch(registerFailure(error)));

  return {};
};

export const saveUserData = data => {

  return {
    type: SAVE_USER_DATA,
    payload: data
  }
};

//region
export const fetchFakeData = () => async dispatch => {
  const response = await getFakeData();
  dispatch({
    type: "FETCH_DATA",
    payload: response.data
  });
};

export const createPost = data => async dispatch => {
 
  const response = await postFakeData(data);
  dispatch({
    type: CREATE_OBJECT,
    payload: response.data
  });
  history.push("/list");
};

export const editPost = (postId, formValues) => async dispatch => {
  var post = new MemeDTO(postId, formValues.title, formValues.description);
  const response = await axios.put(`/posts/${post.id}`, post);
  dispatch({ type: EDIT_OBJECT, payload: post});
  history.push("/list");
};

export const deletePost = postId => async dispatch => {
  await axios.delete(`/posts/${postId}`);
  dispatch({ type: DELETE_OBJECT, payload: postId });
  history.push("/list");
};

export const fetchPost = postId => async dispatch => {
  const response = await axios.get(`/posts/${postId}`);
  dispatch({ type: FETCH_OBJECT, payload: response.data });
};

export const setActiveBookmarkIndex = id => {

  return {
    type: CHANGE_BOOKMARK,
    payload: id
  }
}
