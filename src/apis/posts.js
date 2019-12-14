import axios from "./axios";
import PostDTO from "../DTO/PostDTO";

export const postFakeData = data => {

  var post = new PostDTO(null, data.title, data.description);

  return axios.post('/Posts', post);
};
