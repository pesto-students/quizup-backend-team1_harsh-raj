const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");

// Load config
dotenv.config({ path: "./config/config.env" });

// Connect to DB
connectDB();

const app = express();

let whitelist = [
	"http://localhost:3000",
	"https://quizup-frontend-team1-harsh-raj.vercel.app",
	"https://quizup-webapp.vercel.app",
];
app.use(
	cors({
		origin: function (origin, callback) {
			if (whitelist.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		methods: "GET,POST,PUT,DELETE",
		withCredentials: true,
	})
);

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging
app.use(morgan("dev"));

// Routes
app.use("/api/quiz", require("./routes/quizRoutes"));
app.use("/api/test", require("./routes/mockRoutes"));
app.use("/api/exam", require("./routes/examRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
