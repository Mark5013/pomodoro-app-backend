import express from "express";
import { updatePomodoroLength } from "../controllers/userSettings-controller.js";
import { updateShortBreakLength } from "../controllers/userSettings-controller.js";
import { updateLongBreakLength } from "../controllers/userSettings-controller.js";

const router = express.Router();

// update how long a user wants their pomodoro session length to be
router.patch("/updatePomodoroLength", updatePomodoroLength);

// update how long a user wants their short break session length to be
router.patch("/updateShortBreakLength", updateShortBreakLength);

// update how long a user wants their long break session length to be
router.patch("/updateLongBreakLength", updateLongBreakLength);

export { router as userSettingsRoutes };
