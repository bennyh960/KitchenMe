import React, { useEffect, useState, useContext } from "react";
import recipiesAPI from "../../../api/recipes.users.Api";
import "./comments.css";
import { UserContext } from "../../../App";

export default function Comments({ avatar, postId, getComments }) {
  const [commentInput, setInput] = useState("");
  const [isDisableInput, setDisableInput] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsToShow, setCommentsToshow] = useState(2);

  //   const [commentTodelete, setCommentToDel] = useState("");

  const {
    token,
    user: { _id: userId },
  } = useContext(UserContext);

  const handleInput = ({ target: { value } }) => {
    setInput(value);
  };

  useEffect(() => {
    const getHereTheComments = async () => {
      const commentsFromPosts = await getComments(commentsToShow);
      // console.log(commentsFromPosts);
      setComments(commentsFromPosts);
    };
    // console.log(commentsFromPosts);
    getHereTheComments();
  }, [isDisableInput, commentsToShow]);

  //   useEffect(() => {
  const handleDelete = async (commentTodelete) => {
    // setCommentToDel((p) => commentIdArg);
    try {
      const { data } = await recipiesAPI.postCommentsRouter.delete(`/${postId}/delete/?commentId=${commentTodelete}`);

      //   setCommentsToshow(data);
      setComments(data);
      // console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //   }, [commentsToShow]);

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
        <div className="comments-container" key={comment._id}>
          <div className="user-input">
            <img src={`${url}/${comment.owner}/avatar`} alt="comments-avatar" />
            <div className="comment-detailes">
              <b>{comment.name}</b>
              <p className="content-comment">{comment.content}</p>
              {comment.owner === userId && (
                <p className="edit-delete-comment">
                  <button className="edit-delete-btn-comment button-comment">Edit</button>

                  <button className="edit-delete-btn-comment button-delete" onClick={() => handleDelete(comment._id)}>
                    Delete
                  </button>
                </p>
              )}
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
      {comments && drawComments()}
      <div onClick={() => setCommentsToshow((p) => p + 3)} style={{ cursor: "pointer" }}>
        Load more comments...
      </div>
    </div>
  );
}
