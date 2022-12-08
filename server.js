const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// Load config
dotenv.config({ path: "./config/config.env" });

// Connect to DB
connectDB();

// Passport config
require("./config/passport")(passport);

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging
app.use(morgan("dev"));

// Session middleware
app.use(
	session({
		secret: "chaytan",
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/quiz", require("./routes/quizRoutes"));

// Mock Route
app.use("/api/test", require("./routes/mockRoutes"));

// Exam Route
app.use("/api/exam", require("./routes/ExamRoutes"));

// Auth Route
app.use("/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
