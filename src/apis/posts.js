import axios from "./axios";
import MemeDTO from "../DTO/MemeDTO";

export const postFakeData = data => {

  var post = new MemeDTO(null, data.title, data.description);

  return axios.post('/Posts', post);
};
