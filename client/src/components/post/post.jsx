import React from "react";
import { useState, useEffect } from "react";
import "./post.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ClassicPost from "./classic";
import IngredientTable from "./table";
import Instructions from "./instructions";
import { Link } from "react-router-dom";
import Comments from "./comments/comments";
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
  token,
  postId,
}) {
  const [activeView, setActiveView] = useState(["active-view", "", "", ""]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showComments, setShowComments] = useState(false);
  // const [avatarValid, setAvatar] = useState("https://identix.state.gov/qotw/images/no-photo.gif");
  // console.log("time:", time);

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

  const onSwipeMove = () => {
    console.log("move");
    // console.log(postId);
  };

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
        <div>
          <i className="thumbs up inline icon "></i>12
          {/* <FontAwesomeIcon icon={faStar} color="yellow" size="lg" /> */}
          {/* <b>4.5</b> */}
        </div>
        <div className="title-catagroy-container">
          <h1>{title}</h1>
          <span>{category}</span>
        </div>
        <div>
          <i className="Comments  inline icon large"></i>6
        </div>
      </div>
      <div className="post-content">
        <Carousel
          infiniteLoop={true}
          emulateTouch={true}
          onSwipeMove={onSwipeMove}
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
              <button>
                <i className="thumbs up outline icon large"></i>Like
              </button>
            </li>
            <li>
              <button onClick={() => setShowComments((prev) => !prev)}>
                <i className="comments outline icon large"></i>Comment
              </button>
            </li>
            <li>
              <button>
                <i className="address book outline icon large"></i>Add
              </button>
            </li>
          </ul>
        </div>
        {showComments && <Comments avatar={avatar} token={token} postId={postId} />}
      </div>
    </div>
  );
}
