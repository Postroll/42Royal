import mongoose, { Schema } from "mongoose";

const historySchema = new Schema(
  {
    user_id: [String],
    user_score: [String],
    game_type: Number,
  }
);

const History = mongoose.models.History || mongoose.model("History", historySchema);

export default History;