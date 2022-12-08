const passport = require("passport");
const router = require("express").Router();

// @desc   Auth with Google
// @route  GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc   Auth with Google callback
// @route  GET /auth/google/callback
router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: "http://localhost:3000/dashboard",
		failureRedirect: "http://localhost:3000/login",
		passReqToCallback: true,
	}),
	(req, res) => {
		res.status(200);
	}
);

// @desc  Logout
// @route GET /auth/logout
router.get("/logout", (req, res, next) => {
	req.logOut((err) => {
		if (err) return next(err);
	});
});

router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json(req.user);
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

module.exports = router;
