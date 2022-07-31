import express from "express";
import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";
import { loginRoutes } from "./routes/login-routes.js";
import { logoutRoutes } from "./routes/logout-routes.js";
import { userStatRoutes } from "./routes/userStat-routes.js";
import { userTasksRoutes } from "./routes/userTasks-routes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// connect to database
mongoose.connect(
	`mongodb+srv://Mark5013:${process.env.PASSWORD}@pomotracker.6kx45.mongodb.net/?retryWrites=true&w=majority`
);

// set up schema
const userSchema = new mongoose.Schema({
	username: String,
	googleId: String,
	totalMinutes: { type: Number, default: 0 },
	userLogs: [
		{
			year: String,
			month: String,
			dayNum: String,
			minutes: Number,
		},
	],
	userTasks: [{ title: String, description: String, id: String }],
});

// use findOrCreate plugin for the userSchema
userSchema.plugin(findOrCreate);

export const User = new mongoose.model("User", userSchema);

// set headers
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization, x-csrf-token, credentials"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
	next();
});

// login routes
app.use("/login", loginRoutes);

app.use("/logout", logoutRoutes);

// stats routes
app.use("/stats", userStatRoutes);

// tasks routes
app.use("/tasks", userTasksRoutes);

// listen on port number
app.listen(5000, (req, res) => {
	console.log("listening on port: 5000");
});
