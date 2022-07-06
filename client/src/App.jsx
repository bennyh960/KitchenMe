import "./App.css";
import Post from "./components/post/post";
import Signin from "./components/signin/signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/profilePage/profile";
import Topbar from "./components/topBar/topbar";
import Addrecipe from "./components/profilePage/add-recipe/addrecipe";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/profile/me" element={<ProfilePage />} />
          <Route path="/feed" element={<Post />} />
          <Route path="/sign" element={<Signin />} />
          <Route path="/addNewRecipe" element={<Addrecipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
