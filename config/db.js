const mongoose = require("mongoose");

async function connectDB() {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI);
		console.log(`DB connected: ${connect.connection.host}`);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
}

module.exports = connectDB;
