import { v4 as uuidv4 } from "uuid";
import { User } from "../app.js";

// gets all the tasks with the associated user
export const getUserTasks = async (req, res, next) => {
	// get uid from url
	const userId = req.params.uid;

	// find the user associated with google id
	User.findOne({ googleId: userId }, function (err, doc) {
		if (err) {
			// handles err
			return next(
				new Error("Error occured when looking for google account")
			);
		} else {
			if (doc) {
				// if user is found, return their tasks
				res.status(200).json({ tasks: doc.userTasks });
			} else {
				// if user isn't found, throw error
				return next(
					new Error("Failed to find tasks associated with google id")
				);
			}
		}
	});
};

// add a task to the users task list
export const addTask = async (req, res, next) => {
	// get task and uid from body
	const task = req.body.task;
	const userId = req.body.userId;

	// find the user associated with google id
	User.findOne({ googleId: userId }, function (err, doc) {
		if (err) {
			return next(
				new Error("Error occured when looking for google account")
			);
		} else {
			if (doc) {
				// get user tasks from doc
				const userTasks = doc.userTasks;

				// spread task data and add id to the newly created task
				const newTask = { ...task, id: uuidv4() };

				// push new task into array and save doc
				userTasks.push(newTask);
				doc.save();

				// send back newly created task
				res.status(201).json({ createdTask: newTask });
			} else {
				return next(
					new Error("Failed to find account when trying to add task")
				);
			}
		}
	});
};

// edit a task in the users task list
export const editTask = async (req, res, next) => {
	// extract data from body
	const updatedTask = req.body.updatedTask;
	const taskId = req.body.taskId;
	const userId = req.body.userId;

	// find the user and their tasks
	User.findOne({ googleId: userId }, function (err, doc) {
		if (err) {
			return next(
				new Error("Error occured when searching for google account")
			);
		} else {
			if (doc) {
				// get user tasks from found document
				const userTasks = doc.userTasks;

				// extract the task that needs to be updated
				let foundTask = userTasks.find((task) => task.id === taskId);

				if (foundTask) {
					// edit the found task
					foundTask.title = updatedTask.title;
					foundTask.description = updatedTask.description;
				} else {
					return next(
						new Error("Couldn't find task in users task list")
					);
				}

				// save the document
				doc.save();

				res.status(200).json({ updatedTask: foundTask });
			} else {
				return next(
					new Error(
						"Failed to find account associated with google id"
					)
				);
			}
		}
	});
};

// delete a task from the users task list
export const deleteTask = async (req, res, next) => {
	// extract userId and taskId from url
	const taskId = req.params.taskId;
	const userId = req.params.uid;

	// find user by google id, pull from userTasks task with id of task id
	// this deletes task from users task list
	User.findOneAndUpdate(
		{ googleId: userId },
		{ $pull: { userTasks: { id: `${taskId}` } } },
		function (err, doc) {
			if (err) {
				return next(
					new Error("Error occured when searching for account")
				);
			} else if (!doc) {
				return next(
					new Error(
						"Failed to find account associated with google id"
					)
				);
			} else {
				res.status(204).json({ message: "deleted" });
			}
		}
	);
};
