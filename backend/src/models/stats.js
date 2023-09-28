import mongoose, { Schema } from "mongoose";

const statsSchema = new Schema(
  {
    user_id: String,
    game_count: Number,
    elo: Number,
    titles: [String],
  }
);

const Stats = mongoose.models.Stats || mongoose.model("Stats", statsSchema);

export default Stats;