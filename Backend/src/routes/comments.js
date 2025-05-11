import express from "express";
import { commentCreateValidation } from "../validations/comment.js";
import { handleValidationErrors, checkAuth } from "../middleware/index.js";
import { CommentController } from "../controllers/CommentController.js";

// Create a router for comment-related routes
const router = express.Router({ mergeParams: true }); // mergeParams allows access to postId from parent route

// Route to get all comments for a specific post
router.get("/", CommentController.getAll);

// Route to create a new comment for a specific post (requires authentication)
router.post("/", checkAuth, commentCreateValidation, handleValidationErrors, CommentController.create);

// Route to delete a comment (requires authentication)
router.delete("/:commentId", checkAuth, CommentController.remove);

export default router;
