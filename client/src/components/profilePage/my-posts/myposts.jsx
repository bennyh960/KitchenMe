import Post from "../../post/post";
// import Addrecipe from "../add-recipe/addrecipe";
import { Link } from "react-router-dom";
import "./myposts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Addrecipe from "../add-recipe/addrecipe";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import Aboutme from "../about-me/aboutme";
import React, { useEffect, useState } from "react";
import recipiesAPI from "../../../api/recipes.users.Api";
import Loader2 from "../../loaders/loader2/loader2";
import getTime from "./time";

export default function Myposts({ avatar, name, email, topRated, myRank, createdAt }) {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [owner, setOwner] = useState("");
  // const [isAddedNewRecipe, setRenderNew] = useState(false);
  // const [posts2, setPosts2] = useState("");
  useEffect(() => {
    const getUserPosts = async () => {
      setLoading(true);
      // const { data } = await recipiesAPI.getPublicRecipes(""); //! dont delete this is useful for public posts
      const {
        data: { recipes, owner },
      } = await recipiesAPI.getUserRecipes("");
      setPosts(recipes);
      setOwner(owner);
      setLoading(false);
    };
    getUserPosts();
  }, []);

  const drawPosts = () => {
    console.log(posts);
    return posts.map((post) => {
      return (
        <Post
          key={post._id}
          title={`${post.name}`}
          category={`${post.category}`}
          ingredients={post.ingredients}
          instructions={post.instructions}
          image={post.image}
          avatar={avatar}
          name={owner}
          time={getTime(post.updatedAt)}
        />
      );
      // return <h1>xxxx</h1>;
    });
  };

  return (
    <div className="my-posts-container">
      <div className="my-post-left-container">
        <Addrecipe />
        {isLoading && <Loader2 />}
        {/* <Post /> */}
        {drawPosts()}
        <div className="first-message">
          <h1>Welcome {name}</h1>
          <h3> {createdAt && createdAt.split("T")[0]}</h3>
        </div>
      </div>
      <div className="my-post-right-container">
        <Aboutme name={name} email={email} myRank={myRank} topRated={topRated} />
        <div className="white-box user-friends">
          <h2 style={{ margin: "15px" }} className="line">
            My Friends:
          </h2>
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="white-box user-recipes">
          <h2 style={{ margin: "15px" }} className="line">
            My Top Recipes:
          </h2>
        </div>
      </div>
    </div>
  );
}
