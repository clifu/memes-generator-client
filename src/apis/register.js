import axios from "./axios";

const register = ({
  email,
  password,
  username,
  firstName,
  lastName,
  dateOfBirth,
  phone
}) => {
  const dt = {
    email: email,
    password: password,
    username: username,
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: dateOfBirth,
    phone: phone
  };

  return axios.post("/Auth/register", dt);
};

export default register;
