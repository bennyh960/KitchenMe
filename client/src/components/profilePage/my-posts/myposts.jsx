import Post from "../../post/post";
// import Addrecipe from "../add-recipe/addrecipe";
import { Link } from "react-router-dom";
import "./myposts.css";
import Addrecipe from "../add-recipe/addrecipe";
import Aboutme from "../about-me/aboutme";
import React, { useEffect, useState } from "react";
import recipiesAPI from "../../../api/recipes.users.Api";
import Loader2 from "../../loaders/loader2/loader2";
import getTime from "./time";

export default function Myposts({ avatar, name, email, topRated, myRank, createdAt, friendsList, token }) {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [owner, setOwner] = useState("");
  const [updateNewPostUi, setUpdateUi] = useState(false);

  useEffect(() => {
    const getUserPosts = async () => {
      setLoading(true);
      // const { data } = await recipiesAPI.getPublicRecipes(""); //! dont delete this is useful for public posts
      const {
        data: { recipes, owner },
      } = await recipiesAPI.getUserRecipes("", {
        headers: {
          // Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(recipes);
      setOwner(owner);
      setLoading(false);
    };
    getUserPosts();
  }, [updateNewPostUi, token]);

  const updateUi = () => {
    setUpdateUi((p) => !p);
  };

  const drawPosts = () => {
    // console.log(posts);
    return posts.map((post) => {
      return (
        <Post
          key={post._id}
          title={post.name}
          category={post.category}
          ingredients={post.ingredients}
          instructions={post.instructions}
          image={post.image}
          avatar={avatar}
          name={owner}
          description={post.description}
          time={getTime(post.updatedAt)}
        />
      );
      // return <h1>xxxx</h1>;
    });
  };

  const drawTenBestFreinds = () => {
    const url = process.env.NODE_ENV === "production" ? `/users` : `http://localhost:5000/users`;
    return friendsList.slice(0, 12).map((friend) => {
      return (
        <Link to={`/users/profile/${friend.friendId}`} key={friend.friendId}>
          <div className="friend-container ">
            {friend.isAvatar ? (
              <img src={`${url}/${friend.friendId}/avatar`} alt="" className={"friend-card-image"} />
            ) : (
              <img src={`https://identix.state.gov/qotw/images/no-photo.gif`} alt="" className={"friend-card-image"} />
            )}

            <p>hc name</p>
          </div>
        </Link>
      );
    });
  };

  return (
    <div className="my-posts-container">
      <div className="my-post-left-container">
        <Addrecipe updateUi={updateUi} token={token} />
        {isLoading && <Loader2 />}
        {/* <Loader2 /> */}
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
            My Top Friends:
          </h2>
          <div className="top-friends-container">{drawTenBestFreinds()}</div>
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
