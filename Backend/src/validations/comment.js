import { body } from "express-validator";

// Validation rules for creating a comment
export const commentCreateValidation = [body("text").isLength({ min: 1 }).withMessage("Comment text must be at least 1 character")];
