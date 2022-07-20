import "./App.css";
// import Post from "./components/post/post";
// import Signin from "./components/signin/signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/profilePage/profile";
import OtherProfilePage from "./components/profileOthers/otherProfile";
import Topbar from "./components/topBar/topbar";
import { useState, useEffect, createContext } from "react";
import Homepage from "./components/hompage/Homepage";
import usersApi from "./api/usersApi";
import Authenticate from "./components/authenticate/authenticate";
import MyRecipies from "./components/profilePage/my-recepies/MyRecipies";
import MyFriends from "./components/profilePage/my-friends/Myfriends";
import Chat from "./components/chat/chat";

// ! img profile src is from localhost hardcoded - when build need to fix

export const UserContext = createContext();

function App() {
  const [isUserLogedIn, setIsUserLogedIn] = useState(false);
  const [pendingList, setPendingList] = useState([]);
  const [avatar, setAvatar] = useState("https://identix.state.gov/qotw/images/no-photo.gif");
  const [friendsList, setFriendsList] = useState([]);
  const [authDetailes, setAuthentication] = useState({ user: undefined, token: null });

  const isUser = (bool) => {
    setIsUserLogedIn(bool);
  };

  const setAuth = (obj) => {
    // iin order to reduce size of context
    // const objContextWithoutAvatarBuffer = { ...obj };
    // delete objContextWithoutAvatarBuffer.user.avatar;
    // console.log(objContextWithoutAvatarBuffer);

    setAuthentication(obj);
  };

  const updatePendingList = (list) => {
    setPendingList(list);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      setAuthentication({ token, user });
    } else if (!isUserLogedIn) {
      console.log(isUserLogedIn);
      setAuthentication({ user: undefined, token: null });
    }
    // console.log(user);
  }, [isUserLogedIn]);

  useEffect(() => {
    const token = authDetailes.token;
    if (!token) {
      console.log("no auth ");
      return;
    }

    const getAvatar = async () => {
      // const url = process.env.NODE_ENV === "production" ? `/users` : `http://localhost:5000/users`
      try {
        await usersApi.users.get(`/${authDetailes.user._id}/avatar`);
        // ! can cause problem - in production i should paste the url

        setAvatar(
          process.env.NODE_ENV === "production"
            ? `/users/${authDetailes.user._id}/avatar`
            : `http://localhost:5000/users/${authDetailes.user._id}/avatar`
        );
        // console.log(window.location.host, window.location);
      } catch (error) {
        setAvatar("https://identix.state.gov/qotw/images/no-photo.gif");
        console.log(error.message);
      }
    };

    if (authDetailes.user.isAvatar) {
      getAvatar();
    }
  }, [authDetailes, isUserLogedIn]);

  useEffect(() => {
    // console.log("===========================================================================");
    const updateUserData = async () => {
      if (authDetailes.user) {
        const { data } = await usersApi.getOtherProfile.get(authDetailes.user._id);
        console.log(data.name, "loged in and update data");
      }
    };
    updateUserData();
  }, [pendingList, friendsList, authDetailes]);

  const updateFriendListProp = (friendsListArg) => {
    setFriendsList(friendsListArg);
    // console.log(friendsListArg);
  };

  // useEffect(() => {
  //   console.log("=================================================================");
  //   console.log(authDetailes);
  //   console.log("=================================================================");
  // });

  return (
    <div>
      <UserContext.Provider value={authDetailes}>
        <BrowserRouter>
          {(authDetailes.token || isUserLogedIn) && (
            <Topbar
              avatar={avatar}
              isUser={isUser}
              setAuth={setAuth}
              updatePendingList={updatePendingList}
              updateFriendListProp={updateFriendListProp}
            />
          )}
          <Routes>
            {!authDetailes.token && (
              <Route path={"/login"} element={<Authenticate isUser={isUser} setAuth={setAuth} />} />
            )}
            <Route path="/" element={<Homepage token={authDetailes.token} />} />
            {authDetailes.token && (
              <Route path="/profile/me" element={<ProfilePage avatar={avatar} topRated={"PIZZA 3 STARS"} />} />
            )}

            <Route
              path="/users/profile/:id"
              element={
                <OtherProfilePage
                  currentUserPendingList={authDetailes.user && authDetailes.user.pending}
                  currentUserId={authDetailes.user && authDetailes.user._id}
                  userFriendsList={authDetailes.user && authDetailes.user.friends}
                  token={authDetailes.token}
                />
              }
            />
            <Route path="/profile/recipes" element={<MyRecipies token={authDetailes.token} />} />
            <Route path="profile/myfriends" element={<MyFriends friendsList={friendsList} />} />
            <Route
              path="/chat"
              element={<Chat friendsList={friendsList} userId={authDetailes.user && authDetailes.user._id} />}
            />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;

// TODO : fix image bugs - understand how to use avatar image in prod mode
// TODO : fix logout bug
// TODO : make recipes album functional (including edit and delete )

// TODO : set notifications apeare when (friend request , friend upload new post)
// TODO : make posts can be - comments, like and ranks

// TODO : Adds
