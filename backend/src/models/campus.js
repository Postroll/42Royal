import mongoose, { Schema } from "mongoose";

const campusSchema = new Schema(
  {
    country: String,
    campus: String,
  }
);

const Campus = mongoose.models.Campus || mongoose.model("Campus", campusSchema);

export default Campus;