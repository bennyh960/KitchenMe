import axios from "axios";

// *dev url
const url = "http://localhost:5000";

const createNewRecipe = axios.create({
  baseURL: `${url}/recipes/new`,
});
const getUserRecipes = axios.create({
  baseURL: `${url}/recipes/user`,
});

const recipiesAPI = {
  createNewRecipe,
  getUserRecipes,
};

export default recipiesAPI;
