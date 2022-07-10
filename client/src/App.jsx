import "./App.css";
import Post from "./components/post/post";
import Signin from "./components/signin/signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/profilePage/profile";
import Topbar from "./components/topBar/topbar";
import Addrecipe from "./components/profilePage/add-recipe/addrecipe";
import LogIn from "./components/login/login";
import ForgotPassword from "./components/login/forgotpassword";
import { useState, useEffect } from "react";
import Homepage from "./components/hompage/Homepage";
import usersApi from "./api/usersApi";

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
    // console.log(isUserLogedIn, bool);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      setUser((p) => {
        return { user: "", token: "" };
      });
      return;
    }

    console.log(user.user);

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
        {user.token && <Topbar avatar={avatar} name={user.user.name} />}
        {/* <Topbar /> */}
        <Routes>
          <Route path="/" element={<Homepage isUser={isUser} />} />
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
          {/* <Route path="/feed" element={<Post />} /> //cause error due to post have properties */}
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
          <Route path="/users/new" element={<Signin isUser={isUser} />} />
          <Route path="/users/login" element={<LogIn isUser={isUser} />} />
          <Route path="/users/login/passwordForgot" element={<ForgotPassword />} />
          {/* <Route path="/addNewRecipe" element={<Addrecipe />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// TODO : make new recipe render ui
// TODO : sort user posts
// TODO : fix image bugs
// TODO : create recipes album
// TODO : create freinds
