import { User } from "../app.js";

// updates how long a user wants their pomodoro session length to be
export const updatePomodoroLength = (req, res, next) => {
	// extract uid and new length from req body
	const { uid, newLength } = req.body;

	User.findOne({ googleId: uid }, function (err, doc) {
		if (err) {
			res.status(500).json({
				message: "Something went wrong when searching for user",
			});
		} else if (!doc) {
			res.status(400).json({ message: "User doesn't exist" });
		} else {
			// set the new length
			doc.settings = { ...doc.settings, pomodoroLength: newLength };
			doc.save();
			res.status(200).json({ doc });
		}
	});
};

// updates how long a user wants their short break length to be
export const updateShortBreakLength = (req, res, next) => {
	// extract the uid and new length from the req body
	const { uid, newLength } = req.body;

	User.findOne({ googleId: uid }, function (err, doc) {
		if (err) {
			res.status(500).json({
				message: "Something went wrong when searching for user",
			});
		} else if (!doc) {
			res.status(400).json({ message: "User doesn't exist" });
		} else {
			// set the new length
			doc.settings = { ...doc.settings, shortBreakLength: newLength };
			doc.save();
			res.status(200).json({ doc });
		}
	});
};

// updates how long a user wants their long break length to be
export const updateLongBreakLength = (req, res, next) => {
	// extract uid and new length from req body
	const { uid, newLength } = req.body;

	User.findOne({ googleId: uid }, function (err, doc) {
		if (err) {
			res.status(500).json({
				message: "Something went wrong when searching for user",
			});
		} else if (!doc) {
			res.status(400).json({ message: "User doesn't exist" });
		} else {
			// set the new length
			doc.settings = { ...doc.settings, longBreakLength: newLength };
			doc.save();
			res.status(200).json({ doc });
		}
	});
};
