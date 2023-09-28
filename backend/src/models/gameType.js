import mongoose, { Schema } from "mongoose";

const gameTypeSchema = new Schema(
  {
    type: String,
  }
);

const GameType = mongoose.models.GameType || mongoose.model("GameType", gameTypeSchema);

export default GameType;