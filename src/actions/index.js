import {
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  REGISTER_USER_SUCESS,
  CREATE_OBJECT,
  EDIT_OBJECT,
  DELETE_OBJECT,
  FETCH_OBJECT,
  DISMISS_NOTIFICATION,
  DISPLAY_NOTIFICATION
} from "./types";
import login from "../apis/login";
import { getUserProfileData, getFakeData } from "../apis/gets";
import { postFakeData } from "../apis/posts";
import register from "../apis/register";
import history from "../history";
import axios from "../apis/axios";
import MemeDTO from "../DTO/MemeDTO";
import Cookies from "js-cookie";

//AUTH SECTION
//region
export const signIn = (email, password) => async dispatch => {
  await login(email, password)
    .then(response => {
      dispatch(loginSucess(response.data));
      dispatch(getUserDataAfterLogin(response.data));
    })
    .catch(error => dispatch(loginError(error)));
};

export const loginFromCache = data => {
  return loginSucess(data);
};

const getUserDataAfterLogin = data => async dispatch => {
  await getUserProfileData(data.id);
};

export const loginSucess = (data, type) => {
  const { id, token, expirationTime } = data;

  Cookies.set("userId", id);
  Cookies.set("userToken", token);
  Cookies.set("userTokenExpirationTime", expirationTime);

  history.push("/");
  return {
    type: type ? REGISTER_USER_SUCESS : SIGN_IN_SUCCESS,
    payload: { id, token, expirationTime }
  };
};

export const signOut = () => {
  Cookies.remove("userId");
  Cookies.remove("userToken");
  Cookies.remove("userTokenExpirationTime");
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
      dispatch(loginSucess(response.data, REGISTER_USER_SUCESS))
    )
    .catch(error => dispatch(registerFailure(error)));

  return {};
};

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
