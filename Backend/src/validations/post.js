import { body } from "express-validator";

export const postCreateValidation = [
  body("title").isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),
  body("text").isLength({ min: 10 }).withMessage("Text must be at least 10 characters"),
  body("tags").optional().isArray().withMessage("Tags must be an array"),
  body("imageUrl").optional().isString().withMessage("Image URL must be a string"),
];
