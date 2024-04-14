// src/index.js
import express, { Express } from "express";
import dotenv from "dotenv";
import { connectDB } from "../db/connectDB";
import { postRouter } from "../routes/postRouter";
dotenv.config({
  path: "./.env",
});

const app: Express = express();
const port = process.env.PORT || 3000;

app.use("/posts", postRouter);

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log(`Server Error : ${err}`);
    });
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
