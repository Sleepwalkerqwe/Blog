import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// Fetch all posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

// Fetch tags
export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/posts/tags");
  return data;
});

// Fetch comments for a specific post
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId) => {
    const { data } = await axios.get(`/posts/${postId}/comments`);
    return { postId, comments: data }; // Return both postId and comments for reducer
  }
);

// Create a new comment for a specific post
export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ postId, text }, { getState }) => {
    const token = getState().auth.data?.token; // Assuming auth slice holds the token
    const { data } = await axios.post(
      `/posts/${postId}/comments`,
      { text },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { postId, comment: data };
  }
);

// Delete a comment
export const fetchRemoveComment = createAsyncThunk(
  "comments/fetchRemoveComment",
  async ({ postId, commentId }, { getState }) => {
    const token = getState().auth.data?.token; // Assuming auth slice holds the token
    await axios.delete(`/posts/${postId}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { postId, commentId };
  }
);

// Fetch post for deletion (unchanged)
export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePosts",
  async (id) => {
    await axios.delete(`/posts/${id}`);
    return id;
  }
);

// Define initial state with comments section
const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  comments: {
    items: {}, // Store comments as { postId: [comment1, comment2, ...] }
    status: "idle",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Posts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = "loaded";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = "error";
      });

    // Fetch Tags
    builder
      .addCase(fetchTags.pending, (state) => {
        state.tags.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = "loaded";
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.items = [];
        state.tags.status = "error";
      });

    // Fetch Comments
    builder
      .addCase(fetchComments.pending, (state) => {
        state.comments.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.comments.items[postId] = comments; // Store comments under postId
        state.comments.status = "loaded";
      })
      .addCase(fetchComments.rejected, (state) => {
        state.comments.items = {};
        state.comments.status = "error";
      });

    // Create Comment
    builder.addCase(createComment.fulfilled, (state, action) => {
      const { postId, comment } = action.payload;
      // Add the new comment to the existing list for this post
      if (!state.comments.items[postId]) {
        state.comments.items[postId] = [];
      }
      state.comments.items[postId].push(comment);
    });

    // Delete Comment
    builder.addCase(fetchRemoveComment.fulfilled, (state, action) => {
      const { postId, commentId } = action.payload;
      // Remove the comment from the list for this post
      state.comments.items[postId] = state.comments.items[postId].filter(
        (comment) => comment._id !== commentId
      );
    });

    // Delete Post
    builder.addCase(fetchRemovePost.fulfilled, (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.payload
      );
      // Optionally, clear comments for the deleted post
      delete state.comments.items[action.payload];
    });
  },
});

export const postsReducer = postsSlice.reducer;
