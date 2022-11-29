const mongoose = require("mongoose");
const { Schema } = mongoose;

const MockSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    questions: [
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

module.exports = mongoose.model("Mock", MockSchema);
