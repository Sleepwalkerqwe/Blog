import express from "express";
import { postCreateValidation } from "../validations/post.js";
import { handleValidationErrors, checkAuth } from "../middleware/index.js";
import { PostController } from "../controllers/PostController.js";
import commentRouter from "./comments.js";

const router = express.Router();

// Mount the comments router under /posts/:postId/comments
router.use("/:postId/comments", commentRouter);

// Existing post routes
router.get("/", PostController.getAll);
router.get("/tags", PostController.getLastTags);
router.get("/:id", PostController.getOne);
router.post("/", checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
router.delete("/:id", checkAuth, PostController.remove);
router.patch("/:id", checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

export default router;
