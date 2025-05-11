import CommentModel from "../models/Comment.js";

// Controller for handling comment-related operations
export const CommentController = {
  // Create a new comment
  create: async (req, res) => {
    try {
      // Create a new comment document
      const doc = new CommentModel({
        text: req.body.text,
        user: req.userId, // From checkAuth middleware
        post: req.params.postId, // From URL parameter
      });

      // Save the comment to the database
      const comment = await doc.save();

      // Populate the user field for the response
      await comment.populate("user");
      res.json(comment);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to create comment" });
    }
  },

  // Get all comments for a specific post
  getAll: async (req, res) => {
    try {
      // Find comments for the specified post and populate the user field
      const comments = await CommentModel.find({ post: req.params.postId }).populate("user").exec();
      res.json(comments);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get comments" });
    }
  },

  // Delete a comment
  remove: async (req, res) => {
    try {
      // Find and delete the comment by ID
      const comment = await CommentModel.findOneAndDelete({
        _id: req.params.commentId,
      });

      // Check if the comment exists
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // Verify the user is the owner of the comment
      if (comment.user.toString() !== req.userId) {
        return res.status(403).json({ message: "No access to delete this comment" });
      }

      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to delete comment" });
    }
  },
};
