import axios from "./axios";
import Cookies from "js-cookie";

export const updateMeme = meme => {
  return axios.put(`/posts/${meme.id}`, meme, prepareDataWithToken());
};

function prepareDataWithToken() {
  const dt = {
    headers: {
      Authorization: `Bearer ${Cookies.get("userToken")}`
    }
  };
  return dt;
}
