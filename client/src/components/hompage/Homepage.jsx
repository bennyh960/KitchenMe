import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import recipiesAPI from "../../api/recipes.users.Api";
import Loader2 from "../loaders/loader2/loader2";
import Post from "../post/post";
import Addrecipe from "../profilePage/add-recipe/addrecipe";
import getTime from "../profilePage/my-posts/time";
// import { AuthContext } from "../../App";

import "./homepage.css";

export default function Homepage({ token }) {
  // const authHeader = useContext(AuthContext);
  console.log("home");
  const [publicPosts, setPublicPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateNewPost, setUpdateNew] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    console.log(token);
  }, [navigate, token]);

  const updateNewUi = () => {
    console.log(updateNewPost);
    setUpdateNew((p) => !p);
  };

  useEffect(() => {
    const getRecipes = async () => {
      setIsLoading(true);
      const { data } = await recipiesAPI.getPublicRecipes.get("", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setPublicPosts(data);
      setIsLoading(false);
    };

    try {
      if (token) {
        getRecipes();
        console.log(token);
      } else return;
    } catch (error) {
      console.log(error);
      console.log("error from loading posts in homepage");
    }
  }, [setPublicPosts, token]);

  const drawPublicPosts = () => {
    const noAvatar = "https://identix.state.gov/qotw/images/no-photo.gif";
    const url = process.env.NODE_ENV === "production" ? `/users` : `http://localhost:5000/users`;
    return publicPosts.map((post) => {
      return (
        <Post
          key={post._id}
          avatar={
            // `http://localhost:5000/users/${post.owner}/avatar`
            `${url}/${post.owner}/avatar` ? `${url}/${post.owner}/avatar` : noAvatar
          }
          owner={post.owner}
          name={post.name}
          title={post.name}
          createdAt={post.createdAt}
          category={post.category}
          time={getTime(post.createdAt)}
          email={post.email}
          myRank={"need to check"}
          topRated={"topRated"}
          ingredients={post.ingredients}
          instructions={post.instructions}
          image={post.image}
        />
      );
    });
  };

  return (
    <div className="posts-container">
      <Addrecipe updateUi={updateNewUi} token={token} />

      {/* <div>some box for opening feed</div> */}
      {/* <div>conside to add add recipe</div> */}
      {isLoading && <Loader2 />}
      {drawPublicPosts()}
    </div>
  );
}
