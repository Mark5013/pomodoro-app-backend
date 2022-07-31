import { User } from "../app.js";
import dotenv from "dotenv";
dotenv.config();

// updates how long the user has spent in pomodoro mode
export const updateMinutes = async (req, res, next) => {
	// extract day, month, dayNum, year from body
	const [year, month, dayNum] = req.body.dateStr.split("-");
	// find user by googleId
	User.findOne({ googleId: req.body.userId }, function (err, doc) {
		if (err) {
			return next(new Error("Something went wrong looking for user"));
		} else if (!doc) {
			return next(
				new Error("Couldn't find user associated with google id")
			);
		} else {
			// find proper date in array of dates
			let dateObj = doc.userLogs.find(
				(log) =>
					log.year === year &&
					log.month === month &&
					log.dayNum === dayNum
			);

			// if date obj exists, update the minutes else create the date object and push it in
			if (dateObj) {
				dateObj.minutes += req.body.secondsPassed / 60;
				doc.totalMinutes += req.body.secondsPassed / 60;
			} else {
				dateObj = {
					year,
					month,
					dayNum,
					minutes: req.body.secondsPassed / 60,
				};
				doc.userLogs.push(dateObj);
				doc.totalMinutes += req.body.secondsPassed / 60;
			}

			// save user
			doc.save();
		}
	});
};

export const getDatesMinutes = (req, res, next) => {
	const { uid, date } = req.params;
	const [year, month, dayNum] = date.split("-");

	User.findOne({ googleId: uid }, function (err, doc) {
		if (err) {
			return next(
				new Error("Something went wrong when searching for user!")
			);
		} else if (!doc) {
			return next(new Error("No user found"));
		} else {
			const result = doc.userLogs.find(
				(log) =>
					log.year === year &&
					log.month === month &&
					log.dayNum === dayNum
			);
			if (result) {
				console.log(result.minutes);
				res.status(200).json({ time: result.minutes });
			} else {
				res.status(200).json({ time: 0 });
			}
		}
	});
};
