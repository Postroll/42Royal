import mongoose, { Schema } from "mongoose";

const problemSchema = new Schema(
  {
    gameType: String,
    language: [String],
    title: String,
    stdin: String,
    expectedOutput: String,
    description: String,
    initialCode: String,
    mainCode: String,
    workingSolution: String,
    theme: String,
    tag: [String],
    status:{
      type: String,
      required: true,
      enum: ["Under review", "Accepted", "Rejected", "Suspended"],
      default: "Under review",
    },
    review:{
      reviewer: String,
      status: String,
      comment: String,
    },
    createdBy: Number,
    createdAt: { type: Date, default: Date.now() },
  }
);

const Problem = mongoose.models.Problem || mongoose.model("Problem", problemSchema);

export default Problem;