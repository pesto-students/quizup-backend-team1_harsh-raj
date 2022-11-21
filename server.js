const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load config
dotenv.config({ path: "./config/config.env" });

// Connect to DB
connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/quiz", require("./routes/quizRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
