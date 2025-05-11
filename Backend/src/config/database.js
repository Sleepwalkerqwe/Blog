import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("DB ok ✅");
  } catch (err) {
    console.log("DB error", err);
  }
};
