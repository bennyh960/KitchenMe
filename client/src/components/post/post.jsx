import React from "react";
import { useState, useEffect, useContext } from "react";
import "./post.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ClassicPost from "./classic";
import IngredientTable from "./table";
import Instructions from "./instructions";
import { Link } from "react-router-dom";
import Comments from "./comments/comments";
import recipiesAPI from "../../api/recipes.users.Api";
import { Rating } from "react-simple-star-rating";
import { UserContext } from "../../App";
// import Video from "./video";

// todo : add rating if we got time
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRightFromBracket, faGear, faEdit, faStar } from "@fortawesome/free-solid-svg-icons";

export default function Post({
  title,
  category,
  ingredients,
  instructions,
  image,
  avatar,
  name,
  time,
  description,
  owner,
  // token,
  postId,
  rank,
  voterListlengh,
}) {
  const [activeView, setActiveView] = useState(["active-view", "", "", ""]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [commentArrayLength, setCommentsArrayLength] = useState("");
  const [showStars, setShowStars] = useState(false);
  const {
    // user: { _id: userId, rank },
    user: { _id: userId },
  } = useContext(UserContext);

  const tableView = () => {
    setActiveView(["", "active-view", "", ""]);
    setCurrentSlide(1);
  };
  const instructionView = () => {
    setActiveView(["", "", "active-view", ""]);
    setCurrentSlide(2);
  };
  const classicView = () => {
    setActiveView(["active-view", "", "", ""]);
    setCurrentSlide(0);
  };
  // const videoView = () => {
  //   setActiveView(["", "", "", "active-view"]);
  //   setCurrentSlide(3);
  // };

  // const onSwipeMove = () => {
  // console.log("move");
  // console.log(postId);
  // };

  const getComments = async (commentsToShow) => {
    try {
      const {
        data: { data, length },
      } = await recipiesAPI.postCommentsRouter.get(`/${postId}/?load=${commentsToShow}`);
      // setComments(data);

      setCommentsArrayLength(length);
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getComments(1);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="post-container">
      <div className="post-user">
        <div style={{ display: "flex" }}>
          {owner ? (
            <Link to={`/users/profile/${owner}`}>
              <img src={avatar} alt="post avatar" className="user-poster-img" />
            </Link>
          ) : (
            <img src={avatar} alt="post avatar" className="user-poster-img" />
          )}
          <div className="poster-user-name">
            <div className="username-post">{name.split(" ")[0]}</div>
            {/* <div className="username-post">{name}</div> */}
            <div className="posted-at-time">{time}</div>
          </div>
        </div>
        <div className="change-view">
          <ul className="ul-change-view">
            <li className={activeView[0]}>
              <button onClick={classicView}>
                <i className="clipboard outline icon large"></i>
              </button>
            </li>
            <li className={activeView[1]}>
              <button onClick={tableView}>
                <i className="table icon large"></i>
              </button>
            </li>
            <li className={activeView[2]}>
              <button onClick={instructionView}>
                <i className="tasks icon large"></i>
              </button>
            </li>
            {/* <li className={activeView[3]}>
              <button onClick={videoView}>
                <i className="youtube icon large"></i>
              </button>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="like-comment-counter">
        <div className="post-rate">
          <Rating
            initialValue={parseInt(rank) / 20}
            readonly={true}
            fillColor={"yellow"}
            allowHalfIcon={true}
            size={"2vw"}
          />
          <div className="show-votersLength">
            {voterListlengh !== 0 && voterListlengh === 1 ? "Based on 1 user" : `Based on ${voterListlengh} users`}
          </div>
        </div>
        <div className="title-catagroy-container">
          <h1>{title.length > 30 ? title.slice(0, 30) + "..." : title.slice(0, 30)}</h1>
          <span>{category}</span>
        </div>
        <div>
          <i className="comments inline icon large"></i>
          {commentArrayLength}
        </div>
      </div>
      <div className="post-content">
        <Carousel
          infiniteLoop={true}
          emulateTouch={true}
          // onSwipeMove={onSwipeMove}
          showThumbs={false}
          showArrows={false}
          selectedItem={currentSlide}
          showIndicators={false}
          showStatus={false}
          // dynamicHeight={true}
        >
          <ClassicPost image={image} description={description} />

          <IngredientTable ingredients={ingredients} />
          <Instructions instructions={instructions} />
          {/* <Video url="https://www.youtube.com/watch?v=1IszT_guI08" /> */}
        </Carousel>
      </div>
      <div className="post-blog">
        <div className="action-take">
          <ul className="ul-action-take">
            <li>
              <button
                onClick={() => {
                  // console.log(owner === userId);
                  if (owner !== userId) {
                    setShowComments(false);
                    setShowStars((prev) => !prev);
                  }
                }}
              >
                <i className="star inline icon yellow large"></i>Vote
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowComments((prev) => !prev);
                  setShowStars(false);
                }}
              >
                <i className="comments outline icon large"></i>Comments
              </button>
            </li>
            <li>
              <button>
                <i className="address book outline icon large"></i>Add
              </button>
            </li>
          </ul>
        </div>
        {showComments && <Comments avatar={avatar} postId={postId} getComments={getComments} />}
        {showStars && <StarsComponenent updateGetMethode={showStars} postId={postId} userId={userId} />}
      </div>
    </div>
  );
}

// * consider to add this componenet to different file
function StarsComponenent({ updateGetMethode, postId, userId }) {
  const [rating, setRating] = useState(0);
  const [initialRate, setInitialRate] = useState(0);
  const handleRating = async (rate) => {
    setRating(rate);

    await recipiesAPI.recipesVoteRouter.post("", {
      postId,
      userId,
      rank: parseInt(rate),
    });
    setInitialRate(rate);
    // post new rate
    //update ui setInitialRate
    // console.log(rate);
  };

  useEffect(() => {
    const getUserRate = async () => {
      // console.log("get rate per recipe");
      const { data } = await recipiesAPI.recipesVoteRouter.get("", { params: { postId, userId } });
      // console.log(data);
      setInitialRate(data);
    };
    getUserRate();
  }, [updateGetMethode, postId, userId]);
  return (
    <div className="stars-container">
      <Rating
        onClick={handleRating}
        ratingValue={rating}
        allowHalfIcon={true}
        // showTooltip={true}
        initialValue={initialRate}
      />
    </div>
  );
}
