import express from "express";

import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/USERroutes.js";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
dotenv.config();
import cors from "cors";
//We can only access GET req from the browser

export const app = express();

//using middleware to access req.body for json data
app.use(express.json()); //! use this before routes

app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, //*HEADERS and this should be true
  })
); //for security and arrays are option that are only allowed

//for accessing UserRouters and wer can use prefix for routes

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Nice Working");
});

//error middleware
app.use(errorMiddleware);
