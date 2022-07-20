import Post from "../../post/post";
import "./friendposts.css";
import Aboutme from "../../profilePage/about-me/aboutme";
import React, { useEffect, useState } from "react";
import recipiesAPI from "../../../api/recipes.users.Api";
import usersApi from "../../../api/usersApi";
import Loader2 from "../../loaders/loader2/loader2";
import getTime from "./time";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faEraser, faUserLargeSlash } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

export default function Friendposts({
  name,
  email,
  topRated,
  myRank,
  createdAt,
  friendId,
  userFriendsList,
  currentUserId,
  token,
}) {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  // const [owner, setOwner] = useState("");
  const [updateNewPostUi, setUpdateUi] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState("add");

  const location = useLocation();
  // const { from } = location.state

  // * Manage friend request
  // useEffect(()=>{

  // })

  // * Get Posts from freinds
  useEffect(() => {
    const getUserPosts = async () => {
      setLoading(true);
      try {
        const {
          data: { recipes },
        } = await recipiesAPI.getFriendsPostsRouter(`/${friendId}`);
        setPosts(recipes);
        // setOwner(owner);
        setLoading(false);
        // console.log(owner, recipes);
      } catch (error) {
        console.log(error);
        console.log("error:", "friendId:", friendId);
      }
    };
    getUserPosts();
  }, [updateNewPostUi, friendId, location.key]);

  useEffect(() => {
    // console.log(location);
    //* Get user current pending list currentUserId
    const getUserPendingList = async () => {
      try {
        const { data } = await usersApi.getUserLists.get(`/${currentUserId}`);
        // console.log(data);
        const checkFriendship = data.friends.find((friend) => friend.friendId === friendId);
        if (checkFriendship && checkFriendship.friendId === friendId) {
          setButtonDisplay((p) => "remove");
          console.log("already friends, click for remove friend");
        } else if (
          data.pending.find((waitList) => waitList.pendingId === friendId && waitList.note === "requestedId")
        ) {
          console.log("user send request to this id");
          setButtonDisplay((p) => "cancle");
        } else if (data.pending.find((waitList) => waitList.pendingId === friendId && waitList.note === "senderId")) {
          console.log("this id send u request");
          setButtonDisplay((p) => "answere");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    currentUserId && getUserPendingList();

    // console.log(userFriendsList);
    if (userFriendsList && userFriendsList.includes(friendId)) {
      // console.log(userFriendsList.includes(friendId));
      setButtonDisplay("remove");
    }
  }, [currentUserId, userFriendsList, updateNewPostUi, friendId, buttonDisplay, location.key]);

  const updateUi = () => {
    setUpdateUi((p) => !p);
  };

  const drawPosts = () => {
    // console.log(posts);
    const url = process.env.NODE_ENV === "production" ? `/users` : `http://localhost:5000/users`;
    return posts.map((post) => {
      return (
        <Post
          key={post._id}
          title={`${post.name}`}
          category={`${post.category}`}
          ingredients={post.ingredients}
          instructions={post.instructions}
          image={post.image}
          avatar={`${url}/${friendId}/avatar`}
          name={post.ownerName}
          description={post.description}
          time={getTime(post.updatedAt)}
          postId={post._id}
          token={token}
          owner={post.owner}
          rank={post.rank}
          voterListlengh={post.voted.length}
        />
      );
      // return <h1>xxxx</h1>;
    });
  };

  // * ===================================================================== Friend membership section ==================================
  const handleFriendRequest = async (actionEndPoint) => {
    const headers = {
      // Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      Authorization: `Bearer ${token}`,
    };

    //* update pending list
    const { data, status } = await usersApi.friendshipRouter.post(
      actionEndPoint,
      { id: friendId },
      {
        headers,
      }
    );
    if (status === 201) {
      if (actionEndPoint === "/request" && buttonDisplay === "add") {
        setButtonDisplay((p) => "cancle");
      }
      if (actionEndPoint === "/accept") {
        console.log("should remove id from pending list and update button ");
        handleCancleRequest();
        setButtonDisplay((p) => "remove");
      }
    }
    console.log(data, status);

    // *update notifications db
  };

  const handleCancleRequest = async () => {
    console.log("CANCLE PENDING ONGOING");
    const { data, status } = await usersApi.friendshipRouter.patch("request/cancle", {
      userId: currentUserId,
      friendId,
    });
    console.log(data);
    if (status === 202 && buttonDisplay === "cancle") setButtonDisplay((p) => "add");
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
            <button className="add-friend-btn" onClick={(e) => handleFriendRequest("/request")}>
              <span>Add Friend</span> <FontAwesomeIcon icon={faUserPlus} size={"2xl"} color={"white"} />
            </button>
          )}
          {buttonDisplay === "answere" && (
            <button className="accept-friend-btn" onClick={(e) => handleFriendRequest("/accept")}>
              <span>Accept Request</span> <FontAwesomeIcon icon={faUserPlus} size={"2xl"} color={"white"} />
            </button> //Todo on future add - reject button in order to clean pending list // or clean pending by time
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
