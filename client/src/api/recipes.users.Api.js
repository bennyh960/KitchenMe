import axios from "axios";

// *dev url
// const url = "http://localhost:5000";
// const url = "";
const url = process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

const createNewRecipe = axios.create({
  baseURL: `${url}/recipes/new`,
  // baseURL: `/recipes/new`,
  headers: {
    "content-type": "multipart/form-data", // do not forget this
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  },
});
const getPublicRecipes = axios.create({
  baseURL: `${url}/recipes/public`,
  // baseURL: `/recipes/public`,
});
const getUserRecipes = axios.create({
  baseURL: `${url}/recipes/user`,
  // baseURL: `/recipes/user`,
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  },
});
const getFriendsPostsRouter = axios.create({
  baseURL: `${url}/recipes/friends`,
  // baseURL: `/recipes/friends`,
});

const recipiesAPI = {
  createNewRecipe,
  getPublicRecipes,
  getUserRecipes,
  getFriendsPostsRouter,
};

export default recipiesAPI;
