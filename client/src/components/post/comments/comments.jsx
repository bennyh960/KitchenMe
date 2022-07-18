import React, { useEffect, useState } from "react";
import recipiesAPI from "../../../api/recipes.users.Api";
import "./comments.css";

export default function Comments({ avatar, token, postId }) {
  const [commentInput, setInput] = useState("");
  const [isDisableInput, setDisableInput] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsToShow, setCommentsToshow] = useState(2);

  const handleInput = ({ target: { value } }) => {
    setInput(value);
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await recipiesAPI.postCommentsRouter.get(`/${postId}/?load=${commentsToShow}`);
        setComments(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getComments();
  }, [isDisableInput, commentsToShow]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (postId.length < 1) return;
    try {
      setDisableInput(true);
      await recipiesAPI.postCommentsRouter.post(
        "",
        {
          content: commentInput,
          postId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInput("");
      setDisableInput(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const drawComments = () => {
    const url = process.env.NODE_ENV === "production" ? `/users` : `http://localhost:5000/users`;
    return comments.map((comment) => {
      return (
        <div className="comments-container">
          <div className="user-input">
            <img src={`${url}/${comment.owner}/avatar`} alt="comments-avatar" />
            <div className="comment-detailes">
              <b>{comment.name}</b>
              <p className="content-comment">{comment.content}</p>
              <p className="edit-delete-comment">
                <span>Edit</span> <span>Delete</span>
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="comments-container">
      <div className="user-input">
        <img src={avatar} alt="comments-avatar" />
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            value={commentInput}
            onChange={handleInput}
            placeholder="Write a comment..."
            disabled={isDisableInput}
          />
        </form>
      </div>
      {drawComments()}
      <div onClick={() => setCommentsToshow((p) => p + 3)} style={{ cursor: "pointer" }}>
        Load more comments...
      </div>
    </div>
  );
}
