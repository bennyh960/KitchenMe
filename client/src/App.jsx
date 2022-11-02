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
import AddrecipeDev from "./components/profilePage/add-recipe/add-recipe-devoloper-tools/addRecipeDev";

// * TODO LIST IN PRIORTY ORDER
// TODO : improve ui of post - image should be resize according to text attached - no scroll in this  - 1 hr
// TODO : Improve add recipe UX/UI  // 4-5 hr
// TODO : Imporove UX/UI of the my_friends and my_recipes  -3 hr
// TODO : Improve Chat UX/UI - also make on friends button to start individual chat and search in chat  - around 1 day
// TODO : Add advertisments with other api  - 3hr
// TODO : Improve public page UI (add filter by category and pagination)

// ===================== Post Project in linkdin ==============================

// TODO : Notify user for comments in his posts - 3hr
// TODO : Remove Freind - 2 hr
// TODO : Edit comment in post - 3hr
// TODO : make post private - 1hr
// TODO : (after advertisment step only)Search by recipe in toolbar- make it functional - 2 hr
// TODO : Images (avatar and recipe)  - should be store in S3 and not on mongoDB - around 1day
// TODO : Make user able delete/edit posts - in both , post form and album form - around 2 days

// TODO : Add translation for more languge
// TODO : Add text to speech in recipe reading - 2 days
// TODO : Add speech to text in write recipe - 2 days

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
      // console.log(isUserLogedIn);
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
  const [msgNum, setMsgNum] = useState(0);
  const updateNotification = (num) => {
    setMsgNum(num);
  };
  // useEffect(() => {
  //   console.log("=================================================================");
  //   console.log(authDetailes);
  //   console.log("=================================================================");
  // },[]);

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
              msgNum={msgNum}
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
            <Route path="/developer/recipes/1234" element={<AddrecipeDev token={authDetailes.token} />} />
            <Route path="/profile/recipes" element={<MyRecipies token={authDetailes.token} />} />
            <Route path="profile/myfriends" element={<MyFriends friendsList={friendsList} />} />
            <Route
              path="/chat"
              element={
                <Chat
                  friendsList={friendsList}
                  userId={authDetailes.user && authDetailes.user._id}
                  updateNotification={updateNotification}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
