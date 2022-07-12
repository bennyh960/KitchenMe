import "./App.css";
// import Post from "./components/post/post";
// import Signin from "./components/signin/signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/profilePage/profile";
import OtherProfilePage from "./components/profileOthers/otherProfile";
import Topbar from "./components/topBar/topbar";
import { useState, useEffect } from "react";
import Homepage from "./components/hompage/Homepage";
import usersApi from "./api/usersApi";
import Authenticate from "./components/authenticate/authenticate";

// ! img profile src is from localhost hardcoded - when build need to fix

function App() {
  const [isUserLogedIn, setIsUserLogedIn] = useState(false);
  const [user, setUser] = useState({
    user: "",
    token: "",
  });
  const [avatar, setAvatar] = useState("https://identix.state.gov/qotw/images/no-photo.gif");

  const isUser = (bool) => {
    setIsUserLogedIn(bool);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      setUser((p) => {
        return { user: "", token: "" };
      });
      return;
    }

    // console.log(user.user);

    const userOn = JSON.parse(localStorage.getItem("user"));
    setUser((p) => {
      return { user: userOn, token };
    });
    const getAvatar = async () => {
      try {
        await usersApi.users.get(`/${userOn._id}/avatar`);
        // ! can cause problem - in production i should paste the url
        setAvatar(`http://localhost:5000/users/${userOn._id}/avatar`);
      } catch (error) {
        setAvatar("https://identix.state.gov/qotw/images/no-photo.gif");
        console.log(error.message);
      }
    };

    getAvatar();
  }, [isUserLogedIn]);

  return (
    <div>
      <BrowserRouter>
        {user.token && <Topbar avatar={avatar} name={user.user.name} isUser={isUser} />}
        {!user.token && <Authenticate isUser={isUser} />}
        <Routes>
          <Route path="/" element={<Homepage />} />
          {user.token && (
            <Route
              path="/profile/me"
              element={
                <ProfilePage
                  avatar={avatar}
                  name={user.user.name}
                  createdAt={user.user.createdAt}
                  email={user.user.email}
                  myRank={"4.3"}
                  topRated={"PIZZA 3 STARS"}
                />
              }
            />
          )}
          {user.token && (
            <Route
              path="/feed"
              element={
                <ProfilePage
                  avatar={avatar}
                  name={user.user.name}
                  createdAt={user.user.createdAt}
                  email={user.user.email}
                  myRank={"4.3"}
                  topRated={"PIZZA 3 STARS"}
                />
              }
            />
          )}
          {/* <Route path="/users/profile/:id" element={<OtherProfilePage />} /> //cause error due to post have properties */}
          <Route
            path="/users/profile/:id"
            element={<OtherProfilePage currentUserPendingList={user.user.pending} currentUserId={user.user._id} />}
          />{" "}
          //cause error due to post have properties
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// TODO : fix image bugs
// TODO : create recipes album
// TODO : create freinds
