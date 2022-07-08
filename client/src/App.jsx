import "./App.css";
import Post from "./components/post/post";
import Signin from "./components/signin/signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/profilePage/profile";
import Topbar from "./components/topBar/topbar";
import Addrecipe from "./components/profilePage/add-recipe/addrecipe";
import LogIn from "./components/login/login";
import ForgotPassword from "./components/login/forgotpassword";
import { useState } from "react";
import Homepage from "./components/hompage/Homepage";
function App() {
  const [isUserLogedIn, setIsUserLogedIn] = useState(false);
  const isUser = (bool) => {
    setIsUserLogedIn(bool);
    console.log(isUserLogedIn, bool);
  };
  return (
    <div>
      <BrowserRouter>
        {isUserLogedIn && <Topbar />}
        <Routes>
          <Route path="/" element={<Homepage isUser={isUser} />} />
          <Route path="/profile/me" element={<ProfilePage />} />
          <Route path="/feed" element={<Post />} />
          <Route path="/users/new" element={<Signin />} />
          <Route path="/users/login" element={<LogIn isUser={isUser} />} />
          <Route path="/users/login/passwordForgot" element={<ForgotPassword />} />
          <Route path="/addNewRecipe" element={<Addrecipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
