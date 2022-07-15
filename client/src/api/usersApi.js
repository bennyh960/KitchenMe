import axios from "axios";

// *dev url
const url = "http://localhost:5000";
// const url = "";
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
const userUploadAvatar = axios.create({
  baseURL: `${url}/users/me/avatar`,
});
const getOtherProfile = axios.create({
  baseURL: `${url}/users/profile`, //ep : /:userId
});
const getUserLists = axios.create({
  baseURL: `${url}/user/lists`,
});
// * send request and answere with different endpoints('/request','/accept')
const friendshipRouter = axios.create({
  baseURL: `${url}/users/friend`,
});

const userNotifications = axios.create({
  baseURL: `${url}/user/notifications`,
});

const usersApi = {
  users,
  userNotifications,
  userUploadAvatar,
  newUserRouter,
  findUserRouter,
  logoutRouter,
  resetPassword,
  getOtherProfile,
  friendshipRouter,
  getUserLists,
};

export default usersApi;
