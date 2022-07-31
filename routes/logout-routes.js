import express from "express";
import { logoutUser } from "../controllers/logout-controllers.js";

const router = express.Router();

// log the user out
router.post("/", logoutUser);

export { router as logoutRoutes };
