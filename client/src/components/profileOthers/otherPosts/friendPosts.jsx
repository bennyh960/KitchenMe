import Post from "../../post/post";

import "./friendposts.css";

import Aboutme from "../../profilePage/about-me/aboutme";
import React, { useEffect, useState } from "react";
import recipiesAPI from "../../../api/recipes.users.Api";
import Loader2 from "../../loaders/loader2/loader2";
import getTime from "./time";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {} from "@fortawesome/free-brands-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function Friendposts({ name, email, topRated, myRank, createdAt, friendId }) {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [owner, setOwner] = useState("");
  const [updateNewPostUi, setUpdateUi] = useState(false);

  useEffect(() => {
    // console.log(avatar);
    const getUserPosts = async () => {
      setLoading(true);
      try {
        const {
          data: { recipes, owner },
        } = await recipiesAPI.getFriendsPostsRouter(`/${friendId}`);
        setPosts(recipes);
        setOwner(owner);
        setLoading(false);
        // console.log(owner, recipes);
      } catch (error) {
        console.log(error);
        // console.log("xxxx");
      }
    };
    getUserPosts();
  }, [, updateNewPostUi]);

  const updateUi = () => {
    setUpdateUi((p) => !p);
  };

  const drawPosts = () => {
    // console.log(posts);
    return posts.map((post) => {
      return (
        <Post
          key={post._id}
          title={`${post.name}`}
          category={`${post.category}`}
          ingredients={post.ingredients}
          instructions={post.instructions}
          image={post.image}
          avatar={`http://localhost:5000/users/${friendId}/avatar`}
          name={owner}
          description={post.description}
          time={getTime(post.updatedAt)}
        />
      );
      // return <h1>xxxx</h1>;
    });
  };

  return (
    <div className="my-posts-container">
      <div className="my-post-left-container">
        {isLoading ? <Loader2 /> : drawPosts()}
        <div className="first-message">
          <h1>Welcome {name}</h1>
          <h3> {createdAt && createdAt.split("T")[0]}</h3>
        </div>
      </div>
      <div className="my-post-right-container">
        <div className="add-friend-btn-container">
          <button className="add-friend-btn ">
            Add Friend <FontAwesomeIcon icon={faUserPlus} size={"2xl"} color={"white"} />
          </button>
        </div>

        <Aboutme name={name} email={email} myRank={myRank} topRated={topRated} />
        <div className="white-box user-recipes">
          <h2 style={{ margin: "15px" }} className="line">
            My Top Recipes:
          </h2>
        </div>
      </div>
    </div>
  );
}
