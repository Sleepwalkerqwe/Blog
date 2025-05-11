import { body } from "express-validator";

export const registerValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters"),
  body("fullName").isLength({ min: 3 }).withMessage("Full name must be at least 3 characters"),
  body("avatarUrl").optional().isURL().withMessage("Invalid URL for avatar"),
];

export const loginValidation = [body("email").isEmail().withMessage("Invalid email"), body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters")];
