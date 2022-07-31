import express from "express";
import { loginUser } from "../controllers/login-controllers.js";
import { findOrCreateUser } from "../controllers/login-controllers.js";
import { refreshToken } from "../controllers/login-controllers.js";

const router = express.Router();

// get tokens for the google account
router.post("/", loginUser);

// refreshes access token for user
router.post("/refreshToken", refreshToken);

// find or create the google account
router.post("/findOrCreate", findOrCreateUser);

export { router as loginRoutes };
