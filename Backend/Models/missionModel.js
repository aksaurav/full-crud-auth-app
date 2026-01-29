import mongoose from "mongoose";

const missionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `User`,
      required: true,
    },
  },
  { timestamps: true },
);

const Mission = mongoose.model("Mission", missionSchema);

export default Mission;
