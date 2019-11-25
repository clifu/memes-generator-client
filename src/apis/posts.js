import axios from "./axios";

export const postFakeData = data => {
  var dt = { title: data.title };

  return axios.post("/posts", dt);
};
