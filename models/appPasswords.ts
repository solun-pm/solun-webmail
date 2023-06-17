import mongoose from "mongoose";

const appPasswordsSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    app_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const appPasswords =
  mongoose.models.appPasswords || mongoose.model("appPasswords", appPasswordsSchema);

export default appPasswords;