import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default models.Category || model("Category", CategorySchema);
