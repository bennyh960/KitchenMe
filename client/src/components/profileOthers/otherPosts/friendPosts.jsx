import Post from "../../post/post";

import "./friendposts.css";

import Aboutme from "../../profilePage/about-me/aboutme";
import React, { useEffect, useState } from "react";
import recipiesAPI from "../../../api/recipes.users.Api";
import usersApi from "../../../api/usersApi";
import Loader2 from "../../loaders/loader2/loader2";
import getTime from "./time";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {} from "@fortawesome/free-brands-svg-icons";
import { faUserPlus, faEraser, faUserLargeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Friendposts({
  name,
  email,
  topRated,
  myRank,
  createdAt,
  friendId,
  currentUserPendingList,
  currentUserId,
}) {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [owner, setOwner] = useState("");
  const [updateNewPostUi, setUpdateUi] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState("add");

  // * Manage friend request
  // useEffect(()=>{

  // })

  // * Get Posts from freinds
  useEffect(() => {
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
        console.log("error:", "/${friendId}", friendId);
      }
    };
    getUserPosts();
  }, [, updateNewPostUi, friendId]);

  useEffect(() => {
    //* Get user current pending list currentUserId
    const getUserPendingList = async () => {
      try {
        const { data } = await usersApi.getUserLists.get(`/${currentUserId}`);
        if (data.friends.includes(friendId)) {
          setButtonDisplay("remove");
          console.log("already friends, click for remove friend");
        } else if (data.pending.includes(friendId)) {
          setButtonDisplay("cancle");
        }
      } catch (error) {
        console.log(error.message);
      }
      // if (currentUserPendingList && currentUserPendingList.includes(friendId)) {
    };
    getUserPendingList();
  }, [, updateNewPostUi, friendId, buttonDisplay]);

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

  const handleFriendRequest = async () => {
    const { data, status } = await usersApi.sendFriendRequest.post(
      "",
      { id: friendId },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    if (status === 201 && buttonDisplay === "add") setButtonDisplay("cancle");
    console.log(data, status);
  };

  const handleCancleRequest = async () => {
    // console.log(JSON.parse(localStorage.getItem("token")));
    // const token = await JSON.parse(localStorage.getItem("token"));
    const { data, status } = await usersApi.sendFriendRequest.patch("/cancle", {
      userId: currentUserId,
      friendId,
    });
    console.log(data);
    if (status === 202 && buttonDisplay === "cancle") setButtonDisplay("add");
    updateUi();
  };

  const handleRemoveFriend = async () => {
    console.log("later");
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
          {buttonDisplay === "add" && (
            <button className="add-friend-btn" onClick={handleFriendRequest}>
              <span>Add Friend</span> <FontAwesomeIcon icon={faUserPlus} size={"2xl"} color={"white"} />
            </button>
          )}
          {buttonDisplay === "cancle" && (
            <button className="cancle-friend-btn" onClick={handleCancleRequest}>
              <span>Cancle Request</span>
              <FontAwesomeIcon icon={faEraser} size={"2xl"} color={"white"} />
            </button>
          )}
          {buttonDisplay === "remove" && (
            <button className="cancle-friend-btn" onClick={handleRemoveFriend}>
              <span>Remove Friend</span>
              <FontAwesomeIcon icon={faUserLargeSlash} size={"2xl"} color={"white"} />
            </button>
          )}
        </div>

        <Aboutme name={name} email={email} myRank={myRank} topRated={topRated} hideEdit={true} />
        <div className="white-box user-recipes">
          <h2 style={{ margin: "15px" }} className="line">
            My Top Recipes:
          </h2>
        </div>
      </div>
    </div>
  );
}
