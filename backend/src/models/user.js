import mongoose, { Schema } from "mongoose";
import colyseus from "colyseus";

const userSchema = new Schema(
  {
    id: Number,
    login: String,
    username: String,
    email: String,
    photo: { type: String, default: 'https://w7.pngwing.com/pngs/184/113/png-transparent-user-profile-computer-icons-profile-heroes-black-silhouette.png'},
    intra: String,
    campus: String,
    country: String,
    anonymous: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now() },
    webSocket: {
      sessionID: String,
      reconnectToken: String,
      roomID: String,
    },
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;