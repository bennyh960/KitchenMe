import React, { useEffect, useState } from "react";
import "./myrecipies.css";
import RecipeZoom from "./big-recipe/recipeZoom";
import recipiesAPI from "../../../api/recipes.users.Api";
import Loader2 from "../../loaders/loader2/loader2";
// import { Buffer } from "buffer";

// TODO MAKE SEARCH functional by category and by input

export default function MyRecipies({ token, postSelectedFromNavigation }) {
  const [isLoading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [data, setData] = useState(postSelectedFromNavigation);
  const [popUpZoom, setPpUpZoom] = useState(false);
  const [searchRecipeRes, setRecipeResFromSearch] = useState("");
  useEffect(() => {
    const getUserPosts = async () => {
      setLoading(true);
      // const { data } = await recipiesAPI.getPublicRecipes(""); //! dont delete this is useful for public posts
      const {
        data: { recipes },
      } = await recipiesAPI.getUserRecipes("", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecipes(recipes);
      setLoading(false);
    };
    getUserPosts();
  }, [setRecipes, token]);

  useEffect(() => {
    if (postSelectedFromNavigation._id) {
      setData(() => postSelectedFromNavigation);
      setPpUpZoom(true);
    }
  }, [postSelectedFromNavigation]);

  const DrawRecipes = () => {
    return recipes
      .filter((recipe) => recipe.name.includes(searchRecipeRes) || recipe.category === searchRecipeRes)
      .map((recipe) => {
        return (
          <div
            className="recipe-card"
            key={recipe._id}
            onClick={() => {
              setData(recipe);
              setPpUpZoom(true);
            }}
          >
            <div className={`recipe-title-one ${recipe.category}`}>
              <span>{recipe.name.slice(0, 20)}</span>

              <span style={{ fontSize: "10px" }}>
                <i className="star icon yellow"></i>
                <i className="star icon yellow"></i>
                <i className="star icon yellow"></i>
              </span>
            </div>
            <div
              className="recipe-bg"
              style={{
                backgroundImage: `url(${recipe.image})`,
              }}
            >
              <span></span>
            </div>
          </div>
        );
      });
  };

  const popUpClose = (answere) => {
    setPpUpZoom(answere);
    // console.log(answere);
  };

  const handleChange = (e) => {
    setRecipeResFromSearch(e.target.value);
  };

  const drawCategories = () => {
    const categories = [
      "Breakfast",
      "Lunch",
      "Dinner",
      "Appetizer",
      "Salad",
      "Side-dish",
      "Baked-goods",
      "Vegetarian",
      "Holiday",
      "Junk-Food",
      "Fast-Food",
      "All",
    ];
    return categories.map((cat) => {
      return (
        <div
          key={cat}
          className={cat}
          onClick={() =>
            setRecipeResFromSearch(() => {
              if (cat === "All") return "";
              else return cat;
            })
          }
        >
          {cat}
        </div>
      );
    });
  };
  return (
    <>
      {!popUpZoom ? (
        <div className="my-recipes-container ">
          {/* <div className="loading-absolute-container">{isLoading && <Loader2 />}</div> */}
          <h1 style={{ margin: "2rem" }}>
            <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="" className="my-recipe-logo-image" />
          </h1>

          <div className="ui input my-recipes-searchbar">
            <input type="text" placeholder="Search recipe name" onChange={handleChange} value={searchRecipeRes} />
          </div>

          <div className="categories-container">
            <h2 className="line">Filter By Recipe Category</h2>
            {drawCategories()}
          </div>
          {!isLoading ? (
            <div className="recipes-container">{DrawRecipes()}</div>
          ) : (
            <div>{isLoading && <Loader2 />}</div>
          )}
        </div>
      ) : (
        !isLoading && <RecipeZoom data={data} popUpClose={popUpClose} />
      )}
    </>
  );
}
