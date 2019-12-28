import axios from "./axios";
import Cookies from "js-cookie";

export const getUserProfileDataByAccountId = id => {
  return axios.get(`/users/accountId=${id}`, prepareDataWithToken());
};

export const getMeme = memeId => {
  return axios.get(`/posts/${memeId}`);
};

export const getMemes = () => {
  return axios.get("/posts/");
};

export const getMyMemes = userId => {
  return axios.get(`/posts/myMemes/userId=${userId}`, prepareDataWithToken());
};

export const getMemesOfMyFriends = userId => {
  return axios.get(
    `/posts/myFriendsMemes/userId=${userId}`,
    prepareDataWithToken()
  );
};

function prepareDataWithToken() {
  const dt = {
    headers: {
      Authorization: `Bearer ${Cookies.get("userToken")}`
    }
  };
  return dt;
}
