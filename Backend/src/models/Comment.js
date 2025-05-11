import mongoose from "mongoose";

// Define the schema for a Comment
const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true, // Comment must have text
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User who created the comment
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Reference to the Post the comment belongs to
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export default mongoose.model("Comment", CommentSchema);
