import { User } from "../app.js";
import dotenv from "dotenv";
dotenv.config();

// updates how long the user has spent in pomodoro mode
export const updateMinutes = async (req, res, next) => {
	// extract day, month, dayNum, year from body
	const [day, month, dayNum, year] = req.body.dateStr.split(" ");
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
			} else {
				dateObj = {
					year,
					month,
					dayNum,
					day,
					minutes: req.body.secondsPassed / 60,
				};
				doc.userLogs.push(dateObj);
			}

			// save user
			doc.save();
		}
	});
};
