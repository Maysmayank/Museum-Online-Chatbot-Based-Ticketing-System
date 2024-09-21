// Importing required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
// Configuring dotenv to load environment variables from .env file
dotenv.config();

// Middleware to authenticate user requests
exports.auth = async (req, res, next) => {
	try {
		// Extract JWT from request cookies, body, or header
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

		// If token is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({ success: false, message: "Token Missing" });
		}

		try {
			// Verify the JWT using the secret key
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			req.user = decode; // Store decoded JWT payload in request object
		} catch (error) {
			return res.status(401).json({ success: false, message: "Token is invalid" });
		}

		// Proceed to the next middleware or route handler
		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: "Something went wrong while validating the token",
		});
	}
};

// Middleware to check if the user is a member with discount eligibility
exports.isMember = async (req, res, next) => {
	try {
		// Fetch user details from the database based on the email from the decoded token
		const userDetails = await User.findOne({ email: req.user.email });

		// Check if the user is a member by verifying membership status
		if (!userDetails.membership || !userDetails.membership.isMember) {
			return res.status(401).json({
				success: false,
				message: "This is a protected route for members only",
			});
		}

		// Proceed to the next middleware or route handler
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "User membership can't be verified" });
	}
};
