import User from "../models/users.js";
import ErrorHandler from "../middlewares/error.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(404).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    //send cookie here to access registered user directly login 'features.js' file have jwt access
    sendCookie(newUser, res, "Registered Successfully"); //features.js
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password"); //all data + password

    if (!user) {
      return next(new ErrorHandler("Invalid Email/Password", 404));
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email/Password",
      });
    }
    sendCookie(user, res, `Welcome back , ${user.name}`); //features.js - jwt
  } catch (error) {
    next(error);
  }
};
const logoutUser = (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: "true",
      user: req.user,
    });
};

const getMyProfile = (req, res) => {
  //* - The Middleware is at Middlewares / auth.js

  res.status(200).json({
    success: true,
    user: req.user, //accessing from req object after login
  });
};

export { registerUser, loginUser, getMyProfile, logoutUser };
