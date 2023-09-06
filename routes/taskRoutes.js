import express from "express";
import {
  deleteTask,
  getMyTask,
  newTask,
  updateTask,
} from "../controllers/taskController.js";
import isAuthenticated from "../middlewares/Auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/mytasks", isAuthenticated, getMyTask);

//! taskid will go as parameter as req.params.taskid
router
  .route("/:taskid")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask); //!dynamic url

export default router;
