const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExamSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    mock: [
      {
        type: Schema.Types.ObjectId,
        ref: "MockQuestion",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exam", ExamSchema);
