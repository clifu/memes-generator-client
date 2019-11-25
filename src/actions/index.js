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

export const createObject = data => async dispatch => {
  const response = await postFakeData(data);

  debugger;
  dispatch({
    type: CREATE_OBJECT,
    payload: response.data
  });
};

export const editObject = (objectId, formValues) => async dispatch => {
  const response = await axios.patch(`/obejcts/${objectId}`, formValues);
  dispatch({ type: EDIT_OBJECT, payload: response.data });
  history.push("/");
};

export const deleteObject = objectId => async dispatch => {
  await axios.delete(`/obejcts/${objectId}`);
  dispatch({ type: DELETE_OBJECT, payload: objectId });
  history.push("/");
};

export const fetchObject = objectId => async dispatch => {
  const response = await axios.get(`/objects/${objectId}`);
  dispatch({ type: FETCH_OBJECT, payload: response.data });
};
