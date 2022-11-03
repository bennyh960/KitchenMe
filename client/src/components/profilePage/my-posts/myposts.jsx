import Post from "../../post/post";
// import Addrecipe from "../add-recipe/addrecipe";
import { Link } from "react-router-dom";
import "./myposts.css";
import Addrecipe from "../add-recipe/addrecipe";
import Aboutme from "../about-me/aboutme";
import React, { useEffect, useState } from "react";
import recipiesAPI from "../../../api/recipes.users.Api";
import Loader2 from "../../loaders/loader2/loader2";
// import getTime from "./time";
import getTime from "../../../utils/timeEditor";

export default function Myposts({ avatar, name, email, myRank, createdAt, friendsList, token, directToRecipe }) {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  // const [owner, setOwner] = useState("");
  const [updateNewPostUi, setUpdateUi] = useState(false);

  useEffect(() => {
    const getUserPosts = async () => {
      setLoading(true);
      // const { data } = await recipiesAPI.getPublicRecipes(""); //! dont delete this is useful for public posts
      const {
        data: { recipes },
      } = await recipiesAPI.getUserRecipes("", {
        headers: {
          // Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(recipes);
      // setOwner(owner);
      setLoading(false);
    };
    getUserPosts();
  }, [updateNewPostUi, token]);

  const updateUi = () => {
    setUpdateUi((p) => !p);
  };
  const [postIdToBeFilter, setFilter] = useState([]);
  const handleRefresh = (postIdToFilter) => {
    setFilter((p) => [...p, postIdToFilter]);
  };

  const drawPosts = () => {
    // console.log(postIdToBeFilter);
    return posts
      .filter((p) => !postIdToBeFilter.includes(p._id))
      .map((post) => {
        // console.log(post.description);
        return (
          <Post
            key={post._id}
            postId={post._id}
            title={post.name}
            category={post.category}
            ingredients={post.ingredients}
            instructions={post.instructions}
            image={post.image}
            avatar={avatar}
            name={post.ownerName}
            description={post.description}
            time={getTime(post.updatedAt)}
            token={token}
            owner={post.owner}
            rank={post.rank}
            voterListlengh={post.voted.length}
            handleRefresh={handleRefresh}
            systemGenerate={post.systemGenerate}
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
            <img src={`${url}/${friend.friendId}/avatar`} alt="" className={"friend-card-image"} />
            <p>{friend.name.split(" ")[0].slice(0, 7)}</p>
          </div>
        </Link>
      );
    });
  };
  const drawTenTopRecipes = () => {
    // const [recipeSelected, setSelected] = useState("");
    return posts
      .slice()
      .sort((a, b) => b.rank - a.rank)
      .filter((p) => !postIdToBeFilter.includes(p._id))
      .map((post) => {
        return (
          <div className="friend-container " onClick={() => directToRecipe(post)}>
            <img src={post.image} alt="" className={"friend-card-image"} />

            <p>{post.category.split(" ")[0].slice(0, 7)}</p>
          </div>
        );
      });
  };

  return (
    <div className="my-posts-container">
      <div className="my-post-left-container">
        <Addrecipe updateUi={updateUi} token={token} />
        {isLoading && <Loader2 />}
        {drawPosts()}
        <div className="first-message">
          <h1>Welcome {name}</h1>
          <h3> {createdAt && createdAt.split("T")[0]}</h3>
        </div>
      </div>
      <div className="my-post-right-container">
        <Aboutme name={name} email={email} myRank={myRank} topRated="xxx" />
        <div className="white-box user-friends">
          <h2 style={{ margin: "15px" }} className="user-meta-title line">
            My Top Friends:{" "}
            <span style={{ fontSize: "10px", color: "rgb(180,180,180)" }}>{friendsList.length} Friends</span>
          </h2>
          <div className="top-friends-container">{drawTenBestFreinds()}</div>
        </div>
        <div className="white-box user-recipes">
          <h2 style={{ margin: "15px" }} className="user-meta-title line">
            My Top Recipes: <span style={{ fontSize: "10px", color: "rgb(180,180,180)" }}>{posts.length} Recipes</span>
          </h2>
          <div className="top-friends-container">{drawTenTopRecipes()}</div>
        </div>
      </div>
    </div>
  );
}
