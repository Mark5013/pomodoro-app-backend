import express from "express";
import { updateMinutes } from "../controllers/userStat-controllers.js";
import { getDatesMinutes } from "../controllers/userStat-controllers.js";
import { getMonthsMinutes } from "../controllers/userStat-controllers.js";
import { getYearsMinutes } from "../controllers/userStat-controllers.js";
import { getMonthAndYearMinutes } from "../controllers/userStat-controllers.js";

const router = express.Router();

// update how many minutes the user has sepnt in pomodoro mode
router.post("/updateMinutes", updateMinutes);

// get how many minutes a user spent in pomodoro mode for a specific date
router.get("/getDatesMinutes/:uid/:date", getDatesMinutes);

// get how many mintes a user spent in pomodoro mode for a specific month for the current year
router.get("/getMonthsMinutes/:uid/:month", getMonthsMinutes);

// get how many minutes a user spent in pomodoro mode for a specific year
router.get("/getYearsMinutes/:uid/:year", getYearsMinutes);

// get how many mintes a user spent in pomodoro mode for a specific month and year
router.get("/getMonthAndYearMinutes/:uid/:month/:year", getMonthAndYearMinutes);

export { router as userStatRoutes };
