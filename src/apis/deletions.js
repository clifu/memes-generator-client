import axios from "./axios";
import Cookies from "js-cookie";

export const deleteThatMeme = memeId => {
  return axios.delete(`/posts/${memeId}`, prepareDataWithToken());
};

function prepareDataWithToken() {
  const dt = {
    headers: {
      Authorization: `Bearer ${Cookies.get("userToken")}`
    }
  };
  return dt;
}
