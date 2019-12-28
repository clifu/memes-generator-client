import axios from "./axios";
import MemeDTO from "../DTO/MemeDTO";
import Cookies from "js-cookie";

export const postMeme = data => {
  var post = new MemeDTO(null, data.title, data.description);

  return axios.post("/Posts", post, prepareDataWithToken());
};

function prepareDataWithToken() {
  const dt = {
    headers: {
      Authorization: `Bearer ${Cookies.get("userToken")}`
    }
  };
  return dt;
}
