import {
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  REGISTER_USER_SUCESS,
  CREATE_OBJECT,
  EDIT_OBJECT,
  DELETE_OBJECT,
  FETCH_OBJECT
} from "./types";
import login from "../apis/login";
import { getUserProfileData, getFakeData } from "../apis/gets";
import { postFakeData } from "../apis/posts";
import register from "../apis/register";
import history from "../history";
import axios from "../apis/axios";
import PostDTO from "../DTO/PostDTO"

//AUTH SECTION
//region
export const signIn = (email, password) => async dispatch => {
  await login(email, password)
    .then(response => {
      dispatch(loginSucess(response.data));
      dispatch(getUserDataAfterLogin(response.data));
    })
    .catch(error => console.log(error));
};

export const loginFromCache = data => {
  return loginSucess(data);
};

const getUserDataAfterLogin = data => async dispatch => {
  await getUserProfileData(data.id);
};

export const loginSucess = (data, type) => {
  const { id, token, expirationTime } = data;

  history.push("/");
  return {
    type: type ? REGISTER_USER_SUCESS : SIGN_IN_SUCCESS,
    payload: { id, token, expirationTime }
  };
};

export const signOut = () => {
  return { type: SIGN_OUT };
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
    .catch(error => console.log(error));

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
  var post = new PostDTO(postId, formValues.title, formValues.description);
  const response = await axios.put(`/post/`, post);
  dispatch({ type: EDIT_OBJECT, payload: response.data });
  history.push("/");
};

export const deletePost = postId => async dispatch => {
  await axios.delete(`/post/${postId}`);
  dispatch({ type: DELETE_OBJECT, payload: postId });
  history.push("/list");
};

export const fetchPost = postId => async dispatch => {
  const response = await axios.get(`/post/${postId}`);
  dispatch({ type: FETCH_OBJECT, payload: response.data });
};
