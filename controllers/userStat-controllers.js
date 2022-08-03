import { User } from "../app.js";
import dotenv from "dotenv";
dotenv.config();

const months = {
	Jan: "01",
	Feb: "02",
	Mar: "03",
	Apr: "04",
	May: "05",
	Jun: "06",
	Jul: "07",
	Aug: "08",
	Sept: "09",
	Oct: "10",
	Nov: "11",
	Dec: "12",
};

// updates how long the user has spent in pomodoro mode
export const updateMinutes = async (req, res, next) => {
	// extract day, month, dayNum, year from body
	const [year, month, dayNum] = req.body.dateStr.split("-");
	console.log(req.body.millisecondsPassed);
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
				dateObj.minutes += req.body.millisecondsPassed / 60000;
				doc.totalMinutes += req.body.millisecondsPassed / 60000;
			} else {
				dateObj = {
					year,
					month,
					dayNum,
					minutes: req.body.millisecondsPassed / 60000,
				};
				doc.userLogs.push(dateObj);
				doc.totalMinutes += req.body.millisecondsPassed / 60000;
			}

			// save user
			doc.save();
		}
	});
};

// gets the total minutes spent in pomodoro mode for a specified date
export const getDatesMinutes = (req, res, next) => {
	// extract params from url
	const { uid, date } = req.params;
	// split date into year, month, and dayNum
	const [year, month, dayNum] = date.split("-");

	// find user in data base with matching google id
	User.findOne({ googleId: uid }, function (err, doc) {
		if (err) {
			return next(
				new Error("Something went wrong when searching for user!")
			);
		} else if (!doc) {
			return next(new Error("No user found"));
		} else {
			// find the specific date
			const result = doc.userLogs.find(
				(log) =>
					log.year === year &&
					log.month === month &&
					log.dayNum === dayNum
			);
			// if a date is found return the minutes else, return 0
			if (result) {
				console.log(result.minutes);
				res.status(200).json({ time: result.minutes });
			} else {
				res.status(200).json({ time: 0 });
			}
		}
	});
};

// gets total time over month for current year
export const getMonthsMinutes = (req, res, next) => {
	// extract params from url
	const { uid, month } = req.params;
	let monthString = month.toString().padStart(2, "0");
	// get current year
	const curYear = (new Date().getYear() + 1900).toString();

	// find user in database with google id
	User.findOne({ googleId: uid }, function (err, doc) {
		if (err) {
			return next(
				new Error("Something went wrong when searching for user")
			);
		} else if (!doc) {
			return next(new Error("No user found"));
		} else {
			// accumulate total time over selected month in current year
			const totalTime = doc.userLogs.reduce(
				(acc, e) =>
					e.month === monthString && e.year === curYear
						? acc + e.minutes
						: acc,
				0
			);
			// return the time
			res.status(200).json({ monthlyTime: totalTime });
		}
	});
};

// gets total time in pomodoro mode for the selected year
export const getYearsMinutes = (req, res, next) => {
	// extract uid and year from url
	const { uid, year } = req.params;
	let yearString = year.toString();

	User.findOne({ googleId: uid }, function (err, doc) {
		if (err) {
			return next(
				new Error("Something went wrong when searching for user")
			);
		} else if (!doc) {
			return next(new Error("No user found"));
		} else {
			// accumulate total time over the selected year
			const totalTime = doc.userLogs.reduce(
				(acc, e) => (e.year === yearString ? acc + e.minutes : acc),
				0
			);
			// return the total time
			res.status(200).json({ yearlyTime: totalTime });
		}
	});
};

// gets total time spent in pomodoro mode for the selected month and year
export const getMonthAndYearMinutes = (req, res, next) => {
	// extract uid, month, and year from url
	const { uid, month, year } = req.params;

	// search database for user with google id
	User.findOne({ googleId: uid }, function (err, doc) {
		if (err) {
			return next(
				new Error("Something went wrong when searching for user!")
			);
		} else if (!doc) {
			return next(new Error("No user found"));
		} else {
			// accumulate total time over the selected month in the selected year
			const totalTime = doc.userLogs.reduce(
				(acc, e) =>
					e.year === year && e.month === months[month]
						? acc + e.minutes
						: acc,
				0
			);
			// return the result
			res.status(200).json({ time: totalTime });
		}
	});
};
