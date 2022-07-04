import React from "react";
import Addrecipe from "./add-recipe/addrecipe";
import "./profile.css";

export default function ProfilePage() {
  return (
    <div>
      <div className="my-post">
        <Addrecipe />
      </div>
    </div>
  );
}
