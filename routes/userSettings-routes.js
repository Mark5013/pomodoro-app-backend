import express from "express";
import { updatePomodoroLength } from "../controllers/userSettings-controller.js";
import { updateShortBreakLength } from "../controllers/userSettings-controller.js";
import { updateLongBreakLength } from "../controllers/userSettings-controller.js";

const router = express.Router();

// update how long a user wants their pomodoro session length to be
router.post("/updatePomodoroLength", updatePomodoroLength);

// update how long a user wants their short break session length to be
router.post("/updateShortBreakLength", updateShortBreakLength);

// update how long a user wants their long break session length to be
router.post("/updateLongBreakLength", updateLongBreakLength);

export { router as userSettingsRoutes };
