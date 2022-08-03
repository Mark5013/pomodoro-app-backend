import express from "express";
import { updatePomodoroLength } from "../controllers/userSettings-controller.js";
import { updateShortBreakLength } from "../controllers/userSettings-controller.js";
import { updateLongBreakLength } from "../controllers/userSettings-controller.js";

const router = express.Router();

router.post("/updatePomodoroLength", updatePomodoroLength);

router.post("/updateShortBreakLength", updateShortBreakLength);

router.post("/updateLongBreakLength", updateLongBreakLength);

export { router as userSettingsRoutes };
