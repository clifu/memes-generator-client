import { SIGN_IN_SUCCESS, SIGN_OUT, REGISTER_USER_SUCESS } from "./types";
import login from "../apis/login";
import { getUserProfileData } from "../apis/gets";
import register from "../apis/register";
import history from "../history";

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
