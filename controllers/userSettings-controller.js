import { User } from "../app.js";

export const updatePomodoroLength = (req, res, next) => {
	console.log("acalled");
	const { uid, newLength } = req.body;

	User.findOne({ googleId: uid }, function (err, doc) {
		if (err) {
			return next(
				new Error("Something went wrong when searching for user!")
			);
		} else if (!doc) {
			return next(new Error("No user found!"));
		} else {
			doc.settings = { ...doc.settings, pomodoroLength: newLength };
			doc.save();
			res.status(200).json({ doc });
		}
	});
};

export const updateShortBreakLength = (req, res, next) => {
	const { uid, newLength } = req.body;

	User.findOne({ googleId: uid }, function (err, doc) {
		if (err) {
			return next(
				new Error("Something went wrong when searching for user!")
			);
		} else if (!doc) {
			return next(new Error("No user found!"));
		} else {
			doc.settings = { ...doc.settings, shortBreakLength: newLength };
			doc.save();
			res.status(200).json({ doc });
		}
	});
};

export const updateLongBreakLength = (req, res, next) => {
	const { uid, newLength } = req.body;

	User.findOne({ googleId: uid }, function (err, doc) {
		if (err) {
			return next(
				new Error("Something went wrong when searching for user!")
			);
		} else if (!doc) {
			return next(new Error("No user found!"));
		} else {
			doc.settings = { ...doc.settings, longBreakLength: newLength };
			doc.save();
			res.status(200).json({ doc });
		}
	});
};
