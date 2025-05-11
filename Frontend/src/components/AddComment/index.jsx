import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./AddComment.module.scss";
import { createComment } from "../../redux/slices/postsSlice";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const Index = ({ postId }) => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data); // Assuming auth slice

  const [commentText, setCommentText] = useState("");
  // Handle comment submission
  const handleSubmit = async (e) => {
    console.log("Comment submitted:", commentText);
    e.preventDefault();
    if (commentText.trim()) {
      await dispatch(createComment({ postId, text: commentText }));
      setCommentText(""); // Clear the input after submission
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={userData?.avatarUrl}
          alt={userData?.fullName}
        />

        {userData && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <TextField
              value={commentText}
              placeholder="Add a comment..."
              variant="outlined"
              maxRows={10}
              multiline
              fullWidth
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button variant="contained" type="submit">
              Post Comment
            </Button>
          </form>
        )}
      </div>
    </>
  );
};
