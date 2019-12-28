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

export const getMemesForSpecificUser = userId => {
  return axios.get(`/posts/userId=${userId}`, prepareDataWithToken());
};

export const getMemesOfMyFriends = userId => {
  return axios.get(
    `/posts/myFriendsMemes/userId=${userId}`,
    prepareDataWithToken()
  );
};

export const getFriendsOfSpecificUser = userId => {
  return axios.get(
    `/friends/myFriends/userId=${userId}`,
    prepareDataWithToken()
  );
};

export const getUserProfileDataByUserProfileId = id => {
  return axios.get(`/users/profileId=${id}`, prepareDataWithToken());
};

export const getAllPendingFriendRequests = userId => {
  return axios.get(
    `/friendRequests/myRequests/userId=${userId}`,
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
