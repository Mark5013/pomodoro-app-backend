import express from "express";
import { getUserTasks } from "../controllers/userTasks-controllers.js";
import { addTask } from "../controllers/userTasks-controllers.js";
import { editTask } from "../controllers/userTasks-controllers.js";
import { deleteTask } from "../controllers/userTasks-controllers.js";

const router = express.Router();

// get the users tasks
router.get("/:uid", getUserTasks);

// add a new task
router.post("/addTask", addTask);

// edit a task
router.patch("/editTask", editTask);

// delete a task
router.delete("/deleteTask/:uid/:taskId", deleteTask);

export { router as userTasksRoutes };
