import express from "express";
import dotenv from "dotenv";
import connectDB from "../database/database.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("Database connected successfully ✅");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed ❌", err);
  });
