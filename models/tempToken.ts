import mongoose from "mongoose";

const tempTokenSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    fqe: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    service: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    fast_login: {
      type: Boolean,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: Date.now,
      index: { expires: "5m" },
    },
  },
  {
    timestamps: true,
  }
);

const tempToken =
  mongoose.models.tempToken || mongoose.model("tempToken", tempTokenSchema);

export default tempToken;
