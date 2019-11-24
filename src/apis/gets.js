import axios from "./axios";
import Cookies from "js-cookie";

export const getUserProfileData = id => {
  const dt = {
    headers: {
      Authorization: `Bearer ${Cookies.get("userToken")}`
    }
  };

  return axios.get(`/User/${id}`, dt);
};

export const getFakeData = () => {
  return axios.get("/posts");
};
