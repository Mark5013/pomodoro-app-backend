import express from "express";
import { updateMinutes } from "../controllers/userStat-controllers.js";
import { getDatesMinutes } from "../controllers/userStat-controllers.js";
import { getMonthsMinutes } from "../controllers/userStat-controllers.js";
import { getYearsMinutes } from "../controllers/userStat-controllers.js";
import { getWeeksMinutes } from "../controllers/userStat-controllers.js";

const router = express.Router();

// update how many minutes the user has sepnt in pomodoro mode
router.post("/updateMinutes", updateMinutes);

router.get("/getDatesMinutes/:uid/:date", getDatesMinutes);

router.get("/getMonthsMinutes/:uid/:month", getMonthsMinutes);

router.get("/getYearsMinutes/:uid/:year", getYearsMinutes);

router.get("/getWeeksMinutes/:uid/:week", getWeeksMinutes);

export { router as userStatRoutes };
