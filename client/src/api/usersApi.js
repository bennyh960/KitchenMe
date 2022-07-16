import axios from "axios";

// *dev url
const url = "http://localhost:5000";
// const url = "";
const newUserRouter = axios.create({
  baseURL: `${url}/users/register`,
  // baseURL: `/users/register`,
});
const findUserRouter = axios.create({
  baseURL: `${url}/users/login`,
  // baseURL: `/users/login`,
});
const resetPassword = axios.create({
  baseURL: `${url}/users/reset/password`,
  // baseURL: `/users/reset/password`,
});
const logoutRouter = axios.create({
  baseURL: `${url}/users/logout`,
  // baseURL: `/users/logout`,
});
const users = axios.create({
  baseURL: `${url}/users`,
  // baseURL: `/users`,
});
const userUploadAvatar = axios.create({
  // baseURL: `/users/me/avatar`,
  baseURL: `${url}/users/me/avatar`,
});
const getOtherProfile = axios.create({
  baseURL: `${url}/users/profile`, //ep : /:userId
  // baseURL: `/users/profile`, //ep : /:userId
});
const getUserLists = axios.create({
  baseURL: `${url}/user/lists`,
  // baseURL: `/user/lists`,
});
// * send request and answere with different endpoints('/request','/accept')
const friendshipRouter = axios.create({
  baseURL: `${url}/users/friend`,
  // baseURL: `/users/friend`,
});

const userNotifications = axios.create({
  baseURL: `${url}/user/notifications`,
  // baseURL: `/user/notifications`,
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
