export const logoutUser = (req, res, next) => {
	if (req.cookies.REFRESH_TOKEN) {
		res.cookie("REFRESH_TOKEN", "", {
			secure: true,
			httpOnly: true,
			sameSite: "none",
			maxAge: 0,
		});
		res.status(200).json({ message: "cookie destroyed" });
	} else {
		return next(new Error("No cookie found"));
	}
};
