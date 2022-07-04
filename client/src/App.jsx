import "./App.css";
import Post from "./components/post/post";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/profilePage/profile";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/feed" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
