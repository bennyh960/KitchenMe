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
import MyRecipies from "./components/profilePage/my-recepies/MyRecipies";
import MyFriends from "./components/profilePage/my-friends/Myfriends";
import Chat from "./components/chat/chat";

// ! img profile src is from localhost hardcoded - when build need to fix

function App() {
  const [isUserLogedIn, setIsUserLogedIn] = useState(false);
  const [user, setUser] = useState({
    user: { pending: [], friends: [] },
    token: "",
  });
  const [pendingList, setPendingList] = useState([]);
  const [avatar, setAvatar] = useState("https://identix.state.gov/qotw/images/no-photo.gif");
  const [friendsList, setFriendsList] = useState([]);

  const isUser = (bool) => {
    setIsUserLogedIn(bool);
  };
  const updatePendingList = (list) => {
    setPendingList(list);
  };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      setUser((p) => {
        return { user: { pending: [], friends: [] }, token: "" };
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

  useEffect(() => {
    const updateUserData = async () => {
      // if (user.user && user.user._id) {
      const userOn = JSON.parse(localStorage.getItem("user"));
      if (userOn) {
        const { data } = await usersApi.getOtherProfile.get(userOn._id);
        // console.log(userOn, data);
        // data = updatePendingListByRemoveSelf(data.pending, data);
        console.log(data.name, "loged in and update data");
        localStorage.setItem("user", JSON.stringify(data));
        setUser((prev) => {
          return { ...prev, user: data };
        });
      }
    };
    updateUserData();
  }, [pendingList, friendsList]);

  const updateFriendListProp = (friendsListArg) => {
    setFriendsList(friendsListArg);
    // console.log(friendsListArg);
  };

  // function updatePendingListByRemoveSelf(pendingListIncludeSelf, obj) {
  //   return { ...obj, pending: pendingListIncludeSelf.filter((pending) => pending.content !== "") };
  // }

  return (
    <div>
      <BrowserRouter>
        {(user.token || isUserLogedIn) && (
          <Topbar
            avatar={avatar}
            name={user.user.name}
            isUser={isUser}
            pendingList={user.user.pending}
            updatePendingList={updatePendingList}
            userId={user.user._id}
            updateFriendListProp={updateFriendListProp}
          />
        )}
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
                  friendsList={friendsList}
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
                  friendsList={friendsList}
                />
              }
            />
          )}
          <Route
            path="/users/profile/:id"
            element={
              <OtherProfilePage
                currentUserPendingList={user.user.pending}
                currentUserId={user.user._id}
                userFriendsList={user.user.friends}
              />
            }
          />
          <Route path="/profile/recipes" element={<MyRecipies />} />
          <Route path="profile/myfriends" element={<MyFriends friendsList={friendsList} />} />
          <Route path="/chat" element={<Chat friendsList={friendsList} userId={user.user._id} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// TODO : fix image bugs - understand how to use avatar image in prod mode
// TODO : fix logout bug
// TODO : make recipes album functional (including edit and delete )

// TODO : set notifications apeare when (friend request , friend upload new post)
// TODO : make posts can be - comments, like and ranks

// TODO : CHAT
// TODO : Adds
