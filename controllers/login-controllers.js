import { OAuth2Client, UserRefreshClient } from "google-auth-library";
import { User } from "../app.js";
import dotenv from "dotenv";
dotenv.config();

const oAuth2Client = new OAuth2Client(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	"postmessage"
);

// gets tokens associated with google account
export const loginUser = async (req, res, next) => {
	// extract tokens from code
	const { tokens } = await oAuth2Client.getToken(req.body.code);

	// if no tokens are obtained, throw an error
	if (!tokens) {
		return next(new Error("Tokens couldn't be extracted"));
	}

	if (!req.cookies || !req.cookies.secureCookie) {
		res.cookie(
			"REFRESH_TOKEN",
			JSON.stringify({ refresh_token: tokens.refresh_token }),
			{
				secure: true,
				httpOnly: true,
				expires: new Date(Date.now() + 9000000000),
				sameSite: "none",
			}
		);
	}

	// send back the access token
	res.status(200).json(tokens.access_token);
};

// uses users refresh token to get a new access token
export const refreshToken = async (req, res, next) => {
	if (!req.cookies.REFRESH_TOKEN) {
		return next(new Error("no refresh token found"));
	} else {
		const refreshToken = JSON.parse(req.cookies.REFRESH_TOKEN);
		const user = new UserRefreshClient(
			process.env.CLIENT_ID,
			process.env.CLIENT_SECRET,
			refreshToken.refresh_token
		);

		const { credentials } = await user.refreshAccessToken();

		// if no credentials return error, else return new access token
		if (!credentials) {
			return next(new Error("failed to refresh access token"));
		} else {
			res.status(200).json({ accessToken: credentials.access_token });
		}
	}
};

// finds or creates account associated with google id
export const findOrCreateUser = (req, res, next) => {
	User.findOrCreate(
		{ username: req.body.name, googleId: req.body.id },
		function (err, user) {
			if (err) {
				return next(new Error("User couldn't be created/found"));
			} else {
				console.log(user);
			}
		}
	);

	res.status(200).json({
		message: "User found/created",
	});
};
