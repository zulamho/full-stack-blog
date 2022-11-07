import express from "express";
import multer from "multer"
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import {
  registerValidaton,
  loginValidaton,
  postCreateValidation,
} from "./validations.js";

import UserModel from "./models/User.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

mongoose
  .connect(
    "mongodb+srv://admin06:admin06@cluster0.zvgtk.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("БД на связи"))
  .catch((err) => console.log("БД ошибка", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads")
  },
  filename: (_, file, cb) => {
    cb(null,file.originalname)
  }
})

const upload = multer({storage})

app.use(express.json()); //говорю что теперь он будет понимать json
app.use("/uploads", express.static("uploads"))//для получения картинки по get запросу

app.post("/auth/register", registerValidaton, UserController.register);
app.post("/auth/login", loginValidaton, UserController.login);
app.get("/auth/me", UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.get("/posts", PostController.getAll)
app.get("/posts/:id", PostController.getOne)
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove)
app.patch("/posts/:id",checkAuth,PostController.update)

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server ok");
});
