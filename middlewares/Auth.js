import User from "../models/users.js";
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login Required",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //saved user in request and user have all the data
  req.user = await User.findById(decoded._id);
  next();
};

export default isAuthenticated;
