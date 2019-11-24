import axios from "./axios";

const login = ({ email, password }) => {
  const dt = {
    email: email,
    password: password
  };

  return axios.post("/Auth/login", dt);
};

export default login;
