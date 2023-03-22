import mongoose from "mongoose";

const schema = mongoose.Schema({
  shortened: {
    type: String,
    required: true,
  },
  original: {
    type: String,
    required: true,
  },
  clicked: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("url", schema);
