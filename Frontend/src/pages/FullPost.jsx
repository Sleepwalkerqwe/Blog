import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

import axios from "../axios";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";

import { fetchComments } from "../redux/slices/postsSlice";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.posts);
  const { id } = useParams();

  // Fetch post details and comments when the component mounts
  useEffect(() => {
    // Fetch the post data
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении статьи");
      });

    // Fetch comments for this post
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  // Get the number of comments for this post
  const commentsForPost = comments.items[id] || [];
  const commentsCount = commentsForPost.length;
  // comments.items[id].length
  return (
    <>
      <Post
        _id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        //
        commentsCount={commentsCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>

      <CommentsBlock postId={id}>
        <Index postId={id} />
      </CommentsBlock>
    </>
  );
};
