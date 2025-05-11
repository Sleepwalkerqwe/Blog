import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { SideBlock } from "./SideBlock";

import {
  fetchComments,
  createComment,
  fetchRemoveComment,
} from "../redux/slices/postsSlice";

export const CommentsBlock = ({ postId, items, children }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);

  React.useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const commentsForPost = comments.items[postId] || [];
  const commentsStatus = comments.status;
  const isLoading = commentsStatus === "loading";

  const handleDelete = (commentId) => {
    dispatch(fetchRemoveComment({ postId, commentId }));
  };
  return (
    <SideBlock title="Комментарии">
      <List>
        {commentsForPost.map((comment, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar
                    alt={comment.user.fullName}
                    src={comment.user.avatarUrl}
                  />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText
                  primary={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>{comment.user.fullName}</span>
                      {userData?._id === comment.user._id && (
                        <button
                          onClick={() => handleDelete(comment._id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "red",
                            cursor: "pointer",
                            marginLeft: "10px",
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  }
                  secondary={comment.text}
                />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
