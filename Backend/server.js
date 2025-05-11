import "dotenv/config";
import { connectDB } from "./src/config/database.js";
import app from "./src/app.js";

const PORT = process.env.PORT || 4444;

connectDB();

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK ✅");
});
