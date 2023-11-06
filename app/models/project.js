import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    owner: { type: mongoose.Types.ObjectId, required: true },
    image: { type: String, default: "/defaults/default.png" },
    team: { type: mongoose.Types.ObjectId },
    private: { type: Boolean, default: true },
  },
  {
    timeseries: true,
  }
);

export const projectModel = mongoose.model("team", projectSchema);
