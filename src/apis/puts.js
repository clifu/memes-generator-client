import axios from "./axios";
import Cookies from "js-cookie";

export const updateMeme = meme => {
  return axios.put(`/posts/${meme.id}`, meme, prepareDataWithToken());
};

export const rejectPendingFriendRequest = (requestId, friendRequest) => {
  return axios.put(
    `friendsRequests/updateStateOfRequest/requestId=${requestId}&state=Rejected`,
    friendRequest,
    prepareDataWithToken()
  );
};

export const acceptPendingFriendRequest = (requestId, friendRequest) => {
  return axios.put(
    `friendsRequests/updateStateOfRequest/requestId=${requestId}&state=Accepted`,
    friendRequest,
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
