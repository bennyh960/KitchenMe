import React from "react";
import { useState } from "react";
import "./post.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ClassicPost from "./classic";
import IngredientTable from "./table";
import Instructions from "./instructions";
import Video from "./video";

// todo : add rating if we got time
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRightFromBracket, faGear, faEdit, faStar } from "@fortawesome/free-solid-svg-icons";

export default function Post() {
  const [activeView, setActiveView] = useState(["active-view", "", "", ""]);
  const [currentSlide, setCurrentSlide] = useState(0);

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
  const videoView = () => {
    setActiveView(["", "", "", "active-view"]);
    setCurrentSlide(3);
  };

  const onSwipeMove = () => {
    console.log("move");
  };

  return (
    <div className="post-container">
      <div className="post-user">
        <div style={{ display: "flex" }}>
          <img
            src="https://scontent.fhfa1-1.fna.fbcdn.net/v/t1.18169-9/12140671_10206941372348369_8765013128868409022_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=uONp3u0Y_FQAX-IxAhc&_nc_ht=scontent.fhfa1-1.fna&oh=00_AT8K18D8VWknMw3wdizflt9z4VQh2LxWsOVEV-VHWsktXA&oe=62E8DC12"
            alt=""
            className="user-poster-img"
          />
          <div className="poster-user-name">
            <div className="username-post">Benny</div>
            <div className="posted-at-time">3 hours</div>
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
            <li className={activeView[3]}>
              <button onClick={videoView}>
                <i className="youtube icon large"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="like-comment-counter">
        <div>
          <i className="thumbs up inline icon "></i>12
          {/* <FontAwesomeIcon icon={faStar} color="yellow" size="lg" /> */}
          {/* <b>4.5</b> */}
        </div>
        <h1>Falafel Recipe</h1>
        <div>
          <i className="comments inline icon large"></i>6
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
        >
          <ClassicPost />

          <IngredientTable />
          <Instructions />
          <Video url="https://www.youtube.com/watch?v=1IszT_guI08" />
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
              <button>
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
      </div>
    </div>
  );
}
