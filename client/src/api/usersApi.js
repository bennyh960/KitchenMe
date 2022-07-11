import axios from "axios";

// *dev url
const url = "http://localhost:5000";

const newUserRouter = axios.create({
  baseURL: `${url}/users/register`,
});
const findUserRouter = axios.create({
  baseURL: `${url}/users/login`,
});
const resetPassword = axios.create({
  baseURL: `${url}/users/reset/password`,
});
const logoutRouter = axios.create({
  baseURL: `${url}/users/logout`,
});
const users = axios.create({
  baseURL: `${url}/users`,
});

const usersApi = {
  users,
  newUserRouter,
  findUserRouter,
  logoutRouter,
  resetPassword,
};

export default usersApi;
