const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.post("/login", async (req, res) => {
	try {
		const userData = req.body;

		if (!userData) {
			res.status(401);
			throw new Error("Not authorized, no token");
		}

		let userEmail = userData.email;

		let user = await User.findOne({ email: userEmail });

		if (user) {
			res.status(200).json({
				firstName: user.firstName,
				fullName: user.displayName,
				email: user.email,
				message: "Logged In",
			});
		} else {
			let newUser = {
				googleId: userData.sub,
				email: userData.email,
				displayName: userData.name,
				lastName: userData.family_name,
				firstName: userData.given_name,
				image: userData.picture,
			};

			let createdUser = await User.create(newUser);

			res.status(201).json({
				firstName: createdUser.firstName,
				fullName: createdUser.displayName,
				email: createdUser.email,
				message: "Logged In",
			});
		}
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
