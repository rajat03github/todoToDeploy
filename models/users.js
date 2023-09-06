import mongoose from "mongoose";

const Schmea = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      select: false, // can't select password directly as User.passwords
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", Schmea);

export default User;
