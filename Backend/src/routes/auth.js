import express from "express";
import { loginValidation, registerValidation } from "../validations/auth.js";
import { handleValidationErrors, checkAuth } from "../middleware/index.js";
import { UserController } from "../controllers/UserController.js";

const router = express.Router();

router.post("/login", loginValidation, handleValidationErrors, UserController.login);
router.post("/register", registerValidation, handleValidationErrors, UserController.register);
router.get("/me", checkAuth, UserController.getMe);

export default router;
