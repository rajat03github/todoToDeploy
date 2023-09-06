import ErrorHandler from "../middlewares/error.js";
import Task from "../models/task.js";

const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user, //Auth.js done it
    });

    res.status(201).json({
      success: true,
      message: "Task Added",
    });
  } catch (error) {
    next(error);
  }
};

const getMyTask = async (req, res, next) => {
  try {
    const userId = req.user._id; //will give user._id ObjectId

    const tasks = await Task.find({ user: userId }); //will get full array

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { taskid } = req.params; //for dynamic url
    const task = await Task.findById(taskid);

    if (!task) {
      return next(new ErrorHandler("Task not Found ", 404));
    }

    //! if true then false or if false then true
    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated",
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { taskid } = req.params; //for dynamic url
    const task = await Task.findByIdAndDelete(taskid);

    if (!task) {
      return next(new ErrorHandler("Task not Found ", 404));
    }
    res.status(200).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
};

export { newTask, getMyTask, updateTask, deleteTask };
