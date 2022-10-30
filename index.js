import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { registerValidaton , loginValidaton} from "./validations.js";

import UserModel from "./models/User.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js"

mongoose
  .connect(
    "mongodb+srv://admin06:admin06@cluster0.zvgtk.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("БД на связи"))
  .catch((err) => console.log("БД ошибка", err));

const app = express();

app.use(express.json()); //говорю что теперь он будет понимать json

app.post("/auth/register",registerValidaton, UserController.register);
app.post("/auth/login",loginValidaton,UserController.login)
app.get("/auth/me",UserController.getMe)



 

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server ok");
});
