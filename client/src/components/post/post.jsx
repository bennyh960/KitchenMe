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
import LoaderImg from "../loaders/LoaderIogo";
// TODO : add new loader to delete recipe
// import Loader from "../loaders/loader2/loader2";
// import { Buffer } from "buffer";
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
  postId,
  rank,
  systemGenerate,
  voterListlengh,
  handleRefresh,
}) {
  const [activeView, setActiveView] = useState(["active-view", "", "", ""]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [commentArrayLength, setCommentsArrayLength] = useState("");
  const [showStars, setShowStars] = useState(false);
  const [PopUp, setPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const location = useLocation();

  const {
    user: { _id: userId },
  } = useContext(UserContext);

  const { innerWidth: width } = window;

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

  const [openAccordion, setOpenAccordion] = useState(false);
  const onCarousleChange = (item) => {
    switch (item) {
      case 1:
        setActiveView(["", "active-view", "", ""]);
        break;
      case 2:
        setActiveView(["", "", "active-view", ""]);

        setOpenAccordion(true);
        break;

      default:
        setActiveView(["active-view", "", "", ""]);
        break;
    }
    // console.log(postId);
  };

  const getComments = async (commentsToShow) => {
    try {
      const {
        data: { data, length },
      } = await recipiesAPI.postCommentsRouter.get(`/${postId}/?load=${commentsToShow}`);
      // setComments(data);
      // console.log(image);
      setCommentsArrayLength(length);

      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    // setPopUp((p) => true);
    // loading

    setIsLoading(true);
    setPopUp((p) => false);

    handleRefresh(postId);
    await recipiesAPI.recipesPostDeleteRouter.delete("/", { data: { id: postId } });
  };

  useEffect(() => {
    getComments(1);
    // console.log(image);
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
          </ul>
        </div>
      </div>
      <div className="like-comment-counter">
        <div className="post-title">
          <h1>{title}</h1>
          <span>{"  " + category}</span>
        </div>
        <div className="post-rate">
          <Rating
            initialValue={parseInt(rank) / 20}
            readonly={true}
            fillColor={"yellow"}
            allowHalfIcon={true}
            className="Rating"
            size="30"
          />
          <div className="show-votersLength">
            {voterListlengh !== 0 && voterListlengh === 1 ? "Based on 1 user" : `Based on ${voterListlengh} reviews`}
          </div>
        </div>
      </div>
      <div className="post-content">
        <Carousel
          infiniteLoop={true}
          emulateTouch={false}
          preventMovementUntilSwipeScrollTolerance={true}
          // onSwipeMove={onSwipeMove}
          // showThumbs={true}
          // onClickItem={onClickItem}
          showThumbs={false}
          onChange={onCarousleChange}
          showArrows={false}
          selectedItem={currentSlide}
          showIndicators={false}
          showStatus={false}
          // dynamicHeight={width > 600 ? true : false}
          dynamicHeight={true}
          useKeyboardArrows={true}
        >
          <ClassicPost image={image} description={description} systemGenerate={systemGenerate} />
          <IngredientTable ingredients={ingredients} />
          <Instructions instructions={instructions} openAccordion={openAccordion} />
        </Carousel>
      </div>
      <div className="post-blog">
        {/* <Loader /> */}
        <div className="action-take">
          {!PopUp ? (
            <ul className="ul-action-take">
              <li>
                {owner !== userId ? (
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
                ) : (
                  <div style={{ position: "relative" }}>
                    {isLoading ? (
                      <LoaderImg size={"small"} />
                    ) : (
                      <button onClick={() => setPopUp((p) => true)}>
                        <i className="address eraser icon large"></i>Delete
                      </button>
                    )}
                  </div>
                )}
              </li>
              <li>
                <button
                  onClick={() => {
                    setShowComments((prev) => !prev);
                    setShowStars(false);
                  }}
                >
                  <i className="comments outline icon large"></i>
                  {commentArrayLength} Comments
                </button>
              </li>
              <li>
                <button>
                  <i className="address book outline icon large"></i>Add
                </button>
              </li>
            </ul>
          ) : (
            <div className="ui buttons" id="edit-delete" style={{ width: "100%", margin: "auto" }}>
              <button className="ui pink button" id="cancle-upload-recipe" onClick={handleDeletePost}>
                Confirm Delete
              </button>
              <div className="or"></div>
              <button className="ui red button" id="submit-upload-recipe" onClick={() => setPopUp((p) => !p)}>
                Cancle
              </button>
            </div>
          )}
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
