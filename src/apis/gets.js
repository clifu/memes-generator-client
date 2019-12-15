import axios from "./axios";
import Cookies from "js-cookie";

export const getUserProfileDataByAccountId = id => {
  const dt = {
    headers: {
      Authorization: `Bearer ${Cookies.get("userToken")}`
    }
  };

  return axios.get(`/users/accountId=${id}`, dt);
};

export const getFakeData = () => {
  return axios.get("/posts/");
};
