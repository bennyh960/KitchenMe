import axios from "axios";

// *dev url
const url = "http://localhost:5000";

const createNewRecipe = axios.create({
  baseURL: `${url}/recipes/new`,
  headers: {
    "content-type": "multipart/form-data", // do not forget this
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  },
});
const getPublicRecipes = axios.create({
  baseURL: `${url}/recipes/public`,
});
const getUserRecipes = axios.create({
  baseURL: `${url}/recipes/user`,
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  },
});

const recipiesAPI = {
  createNewRecipe,
  getPublicRecipes,
  getUserRecipes,
};

export default recipiesAPI;
