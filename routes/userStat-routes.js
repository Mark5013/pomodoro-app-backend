import express from "express";
import { updateMinutes } from "../controllers/userStat-controllers.js";

const router = express.Router();

// update how many minutes the user has sepnt in pomodoro mode
router.post("/updateMinutes", updateMinutes);

export { router as userStatRoutes };
