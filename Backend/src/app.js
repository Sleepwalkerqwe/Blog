import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import uploadRoutes from "./routes/upload.js";

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Register routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/upload", uploadRoutes);

export default app;
