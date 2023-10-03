import mongoose, { Schema } from "mongoose";

const problemSchema = new Schema(
  {
    game_type: String,
    language: [String],
    title: String,
    stdin: String,
    expected_output: String,
    description: String,
    initial_code: String,
    main_code: String,
    theme: String,
    status:{
      type: String,
      required: true,
      enum: ["Under review", "Accepted", "Rejected", "Suspended"],
      default: "Under review",
    },
    reviewed_by: [String],
    created_by: Number,
    created_at: { type: Date, default: Date.now() },
  }
);

const Problem = mongoose.models.Problem || mongoose.model("Problem", problemSchema);

export default Problem;